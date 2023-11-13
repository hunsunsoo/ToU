package com.welcome.tou.webauthn;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.Set;

@AllArgsConstructor
@RequiredArgsConstructor
@Builder
@Data
public class WebAuthnUserEnrollDto {

    private String userHandle;
    private String username;
    private String clientDataJSON;
    private String attestationObject;
    private Set<String> transports;
    private String clientExtension;

}
