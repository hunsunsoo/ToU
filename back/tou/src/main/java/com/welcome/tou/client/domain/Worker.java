package com.welcome.tou.client.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "WORKER")
public class Worker {

    // 실무자 일련번호
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "worker_seq", unique = true, nullable = false)
    private Long workerSeq;

    // 사업체 참조키
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_seq")
    private Company company;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "branch_seq")
    private Branch branch;

    // 성명
    @Column(name = "worker_name", length = 50, nullable = false)
    private String workerName;

    // 연락처
    @Column(name = "phone", length = 20, nullable = false)
    private String phone;

    // 로그인 아이디
    @Column(name = "login_id", length = 50, nullable = false)
    private String loginId;

    // 비밀번호
    @Column(name = "password", nullable = false)
    private String password;

    // 이메일
    @Column(name = "email", length = 70)
    private String email;

    // 생체인증
    @Column(name = "biometrics")
    private String biometrics;

    // 리프레시 토큰
    @Column(name = "refresh_token")
    private String refreshToken;

    // 권한
    @Enumerated(EnumType.STRING)
    @Column(name = "role", length = 20, nullable = false)
    private Role role;


    public enum Role {
        PRODUCER, OFFICIALS, SELLER, ADMIN
    }

    public void updateRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }
}
