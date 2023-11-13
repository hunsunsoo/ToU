package com.welcome.tou.webauthn;

import com.webauthn4j.springframework.security.WebAuthnRegistrationRequestValidationResponse;
import com.webauthn4j.springframework.security.WebAuthnRegistrationRequestValidator;
import com.webauthn4j.springframework.security.authenticator.WebAuthnAuthenticatorImpl;
import com.webauthn4j.springframework.security.authenticator.WebAuthnAuthenticatorManager;
import com.webauthn4j.springframework.security.challenge.ChallengeRepository;
import com.webauthn4j.springframework.security.exception.PrincipalNotFoundException;
import com.webauthn4j.springframework.security.exception.WebAuthnAuthenticationException;
import com.webauthn4j.util.Base64UrlUtil;
import com.webauthn4j.util.UUIDUtil;
import com.webauthn4j.util.exception.WebAuthnException;
import com.welcome.tou.common.utils.ResultTemplate;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationTrustResolver;
import org.springframework.security.authentication.AuthenticationTrustResolverImpl;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/webauthn")
public class WebAuthnController {

    @Autowired
    private WebAuthnAuthenticatorManager webAuthnAuthenticatorManager;

    @Autowired
    private WebAuthnRegistrationRequestValidator registrationRequestValidator;

    @Autowired
    private ChallengeRepository challengeRepository;

    private AuthenticationTrustResolver authenticationTrustResolver = new AuthenticationTrustResolverImpl();


    @GetMapping(value = "/user")
    public ResultTemplate<?> getUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            UserDetails user = (UserDetails) authentication.getPrincipal();
            return ResultTemplate.builder().status(200).data(user.getUsername()).build();
        } else {
            return ResultTemplate.builder().status(499).data("유저정보조회실패").build();
        }
    }

    @GetMapping(value = "/user-handle")
    public ResultTemplate<?> getUserHandle(@AuthenticationPrincipal UserDetails worker) {
        var userHandle = Base64UrlUtil.encodeToString(UUIDUtil.convertUUIDToBytes(UUID.randomUUID()));
        Map<String, String> userInfo = new HashMap<>();
        userInfo.put("userHandle", userHandle);
        userInfo.put("username", worker.getUsername());

        return ResultTemplate.builder().status(200).data(userInfo).build();
    }


    @PostMapping(value = "/enroll")
    public ResultTemplate<?> create(HttpServletRequest servletRequest, @RequestBody WebAuthnUserEnrollDto request) {
        try {
            WebAuthnRegistrationRequestValidationResponse registrationRequestValidationResponse;
            try {
                registrationRequestValidationResponse = registrationRequestValidator.validate(
                        servletRequest,
                        request.getClientDataJSON(),
                        request.getAttestationObject(),
                        request.getTransports(),
                        request.getClientExtension()
                );
            } catch (WebAuthnException | WebAuthnAuthenticationException e) {
                return ResultTemplate.builder().status(499).data(e.getMessage()).build();
            }

            var username = request.getUsername();
            System.out.println("여기여");
            var authenticator = new WebAuthnAuthenticatorImpl(
                    "authenticator",
                    username,
                    registrationRequestValidationResponse.getAttestationObject().getAuthenticatorData().getAttestedCredentialData(),
                    registrationRequestValidationResponse.getAttestationObject().getAttestationStatement(),
                    registrationRequestValidationResponse.getAttestationObject().getAuthenticatorData().getSignCount(),
                    registrationRequestValidationResponse.getTransports(),
                    registrationRequestValidationResponse.getRegistrationExtensionsClientOutputs(),
                    registrationRequestValidationResponse.getAttestationObject().getAuthenticatorData().getExtensions()
            );

            try {
                webAuthnAuthenticatorManager.createAuthenticator(authenticator);
            } catch (IllegalArgumentException ex) {
                return ResultTemplate.builder().status(499).data("오류2").build();
            }
        } catch (RuntimeException ex) {
            return ResultTemplate.builder().status(499).data(ex.getMessage()).build();
        }

        return ResultTemplate.builder().status(200).data("등록 완료").build();
    }


    private List<String> getCredentialIds() {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        var principal = authentication.getPrincipal();
        if(principal == null || authenticationTrustResolver.isAnonymous(authentication)) {
            return Collections.emptyList();
        }
        else {
            try {
                var webAuthnAuthenticators = webAuthnAuthenticatorManager.loadAuthenticatorsByUserPrincipal(principal);
                return webAuthnAuthenticators.stream()
                        .map(webAuthnAuthenticator -> Base64UrlUtil.encodeToString(webAuthnAuthenticator.getAttestedCredentialData().getCredentialId()))
                        .collect(Collectors.toList());
            } catch (PrincipalNotFoundException e) {
                return Collections.emptyList();
            }
        }
    }

}
