package com.welcome.tou.client.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "PASS")
public class Pass {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pass_seq", unique = true, nullable = false)
    private Long workerSeq;

    // 사업체 참조키
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "worker_seq")
    private Worker worker;

    @Column(name = "pass_id", nullable = false)
    private String passId;

    public static Pass createPass(Worker worker, String passId) {
        Pass pass = new Pass();
        pass.worker = worker;
        pass.passId = passId;
        return pass;
    }
}
