package com.welcome.tou.client.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "BRANCH")
public class Branch {

    // 지점 일련번호
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "branch_seq", unique = true, nullable = false)
    private Long BranchSeq;

    // 사업체 참조키
    @ManyToOne
    @JoinColumn(name = "company_seq")
    private Company company;

    // 지점명
    @Column(name = "branch_name", length = 50, nullable = false)
    private String branchName;

    // 소재지
    @Column(name = "branch_location", nullable = false)
    private String branchLocation;

    // 유통라인 고유코드
    @Column(name = "channel_code", length = 4, nullable = false)
    private String channelCode;

    // 연락처
    @Column(name = "branch_contact", length = 20, nullable = false)
    private String branchContact;

    // 업체구분
    @Enumerated(EnumType.STRING)
    @Column(name = "branch_type", length = 20, nullable = false)
    private BranchType branchType;


    public enum BranchType {
        PRODUCT, PROCESS, PACKAGING, SELL;
    }

}
