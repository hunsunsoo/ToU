package com.welcome.tou.webauthn;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.List;

@AllArgsConstructor
@RequiredArgsConstructor
@Builder
@Data
public class WebAuthnUserRequestDto {

    private String userHandle;
    private String username;
    private String webAuthnChallenge;
    private List<String> webAuthnCredentialIds;

}
