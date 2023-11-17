package com.welcome.tou.security.config;

import com.webauthn4j.WebAuthnManager;
import com.webauthn4j.data.AttestationConveyancePreference;
import com.webauthn4j.data.PublicKeyCredentialParameters;
import com.webauthn4j.data.PublicKeyCredentialType;
import com.webauthn4j.data.attestation.statement.COSEAlgorithmIdentifier;
import com.webauthn4j.springframework.security.WebAuthnAuthenticationProvider;
import com.webauthn4j.springframework.security.authenticator.WebAuthnAuthenticatorService;
import com.webauthn4j.springframework.security.config.configurers.WebAuthnLoginConfigurer;
import com.welcome.tou.client.domain.WorkerRepository;
import com.welcome.tou.security.jwt.filter.JwtAuthenticationProcessingFilter;
import com.welcome.tou.security.jwt.service.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@Slf4j
public class SecurityConfig {

    private final JwtService jwtService;
    private final WorkerRepository workerRepository;
    private final CorsConfig corsConfig;

    @Autowired
    private ApplicationContext applicationContext;

    /**
     *  security webauthn을 사용한 인증을 처리하는 역할
     */
    @Bean
    public WebAuthnAuthenticationProvider webAuthnAuthenticationProvider(WebAuthnAuthenticatorService authnAuthenticatorService, WebAuthnManager webAuthnManager) {
        return new WebAuthnAuthenticationProvider(authnAuthenticatorService, webAuthnManager);
    }

    @Bean
    public AuthenticationManager authenticationManager(List<AuthenticationProvider> providers) {
        return new ProviderManager(providers);
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, AuthenticationManager authenticationManager) throws Exception {
        /**
         *  WebAuthn Login
         */
        http.apply(WebAuthnLoginConfigurer.webAuthnLogin())
            .failureHandler(((request, response, exception) -> {
                log.error("Webauthn 인증 에러");
            }))
            .attestationOptionsEndpoint()
            .rp()
            .name("to-u-worker-auth")
            .and()
            .pubKeyCredParams(
                new PublicKeyCredentialParameters(PublicKeyCredentialType.PUBLIC_KEY, COSEAlgorithmIdentifier.ES256),
                new PublicKeyCredentialParameters(PublicKeyCredentialType.PUBLIC_KEY, COSEAlgorithmIdentifier.RS256)
            )
            .attestation(AttestationConveyancePreference.DIRECT)
            .extensions()
            .uvm(true)
            .credProps(true)
            .extensionProviders()
            .and()
            .assertionOptionsEndpoint()
            .extensions()
            .extensionProviders();

        http
            .formLogin().disable()
            .httpBasic().disable()
            .csrf().disable()
            .cors(corsConfigurer -> corsConfigurer.configurationSource(corsConfig.corsConfigurationSource()))
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .authorizeHttpRequests()
//            .anyRequest().permitAll();
            .requestMatchers("/api/consumer/**").permitAll()
            .requestMatchers("/api/client/login").permitAll()
            .requestMatchers("/api/client/pass-login").permitAll()
            .requestMatchers("/api/webauthn/**").permitAll()
            .requestMatchers("/api/client/company").hasRole("SELLER")
            .anyRequest().authenticated()
            .and()
            .addFilterBefore(new JwtAuthenticationProcessingFilter(jwtService, workerRepository), UsernamePasswordAuthenticationFilter.class);

        http.headers(headers -> {
            // 'publickey-credentials-get *' allows getting WebAuthn credentials to all nested browsing contexts (iframes) regardless of their origin.
            headers.permissionsPolicy(config -> config.policy("publickey-credentials-get *"));
            // Disable "X-Frame-Options" to allow cross-origin iframe access
            headers.frameOptions(Customizer.withDefaults()).disable();
        });

        return http.getOrBuild();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
