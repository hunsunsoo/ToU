package com.welcome.tou.security.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.cbor.CBORFactory;
import com.webauthn4j.WebAuthnManager;
import com.webauthn4j.converter.util.ObjectConverter;
import com.webauthn4j.metadata.converter.jackson.WebAuthnMetadataJSONModule;
import com.webauthn4j.springframework.security.WebAuthnRegistrationRequestValidator;
import com.webauthn4j.springframework.security.WebAuthnSecurityExpression;
import com.webauthn4j.springframework.security.authenticator.InMemoryWebAuthnAuthenticatorManager;
import com.webauthn4j.springframework.security.authenticator.WebAuthnAuthenticatorManager;
import com.webauthn4j.springframework.security.authenticator.WebAuthnAuthenticatorService;
import com.webauthn4j.springframework.security.challenge.ChallengeRepository;
import com.webauthn4j.springframework.security.challenge.HttpSessionChallengeRepository;
import com.webauthn4j.springframework.security.converter.jackson.WebAuthn4JSpringSecurityJSONModule;
import com.webauthn4j.springframework.security.options.*;
import com.webauthn4j.springframework.security.server.ServerPropertyProvider;
import com.webauthn4j.springframework.security.server.ServerPropertyProviderImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class WebauthnSecurityConfig {

    /**
     *  1. webauthn 인증기 관리
     *      Authenticator 객체 관리하고, 사용자 등록, 로그인, 인증서 검증 등의 기능을 수행
     *      Authenticator는 고유한 키 쌍을 가진다
     */
    @Bean
    public WebAuthnAuthenticatorManager webAuthnAuthenticatorManager() {
        return new InMemoryWebAuthnAuthenticatorManager();
    }

    /**
     *  2. Webauthn 데이터 형식 컨버터
     *      Webauthn 데이터를 JSON 또는 CBOR 형식으로 변환
     */
    @Bean
    public ObjectConverter objectConverter() {
        var jsonMapper = new ObjectMapper();
        jsonMapper.registerModule(new WebAuthnMetadataJSONModule());
        jsonMapper.registerModule(new WebAuthn4JSpringSecurityJSONModule());
        var cborMapper = new ObjectMapper(new CBORFactory());
        return new ObjectConverter(jsonMapper, cborMapper);
    }

    /**
     *  3. WebAuthn 요청 및 응답을 위한 핵심메서드
     *  Webauthn 인증을 관리하고 처리, (2) ObjectConverter를 사용하여 데이터를 변환
     *  non strict 모드로 인스턴스 생성 => 엄격한 검증을 하지않음. 유연한 처리위해
     */
    @Bean
    public WebAuthnManager webAuthnManager(ObjectConverter objectConverter) {
        return WebAuthnManager.createNonStrictWebAuthnManager(objectConverter);
    }

    /**
     *  4. 사용자의 웹 인증상태를 평가하는 데 사용되는 표현식을 제공하는 클래스
     *      spring security 의 access 에 사용
     *      안쓸수도 있음
     */
    @Bean
    public WebAuthnSecurityExpression webAuthnSecurityExpression() {
        return new WebAuthnSecurityExpression();
    }

    /**
     *  5. 세션에서 도전 과제를 저장하고 관리하는 레포지토리
     *      보안 / 검증 목적
     */
    @Bean
    public ChallengeRepository challengeRepository() {
        return new HttpSessionChallengeRepository();
    }

    @Bean
    public RpIdProvider rpIdProvider() {
        return new RpIdProviderImpl();
    }

    /**
     *  6. 웹인증의 등록과 확인시 제공할 옵션을 결정
     *  (5) 받음
     */
    @Bean
    public AttestationOptionsProvider attestationOptionsProvider(RpIdProvider rpIdProvider, WebAuthnAuthenticatorService webAuthnAuthenticatorService, ChallengeRepository challengeRepository) {
        return new AttestationOptionsProviderImpl(rpIdProvider, webAuthnAuthenticatorService, challengeRepository);
    }

    @Bean
    public AssertionOptionsProvider assertionOptionsProvider(RpIdProvider rpIdProvider, WebAuthnAuthenticatorService webAuthnAuthenticatorService, ChallengeRepository challengeRepository) {
        return new AssertionOptionsProviderImpl(rpIdProvider, webAuthnAuthenticatorService, challengeRepository);
    }

    /**
     *  7. 서버 속성 제공 (5)번 받아서 제공
     */
    @Bean
    public ServerPropertyProvider serverPropertyProvider(RpIdProvider rpIdProvider, ChallengeRepository challengeRepository) {
        return new ServerPropertyProviderImpl(rpIdProvider, challengeRepository);
    }

    /**
     *  8. (3), (7) 번 받아서 제공
     *      웹 인증 처리와 유효성을 검사하는 필요 정보 제공
     */
    @Bean
    public WebAuthnRegistrationRequestValidator webAuthnRegistrationRequestValidator(WebAuthnManager webAuthnManager, ServerPropertyProvider serverPropertyProvider) {
        return new WebAuthnRegistrationRequestValidator(webAuthnManager, serverPropertyProvider);
    }
}
