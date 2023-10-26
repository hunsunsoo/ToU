package com.welcome.tou.stock.domain;

import com.welcome.tou.client.domain.Company;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "PRODUCT")
public class Product {

    // 상품 일련번호
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_seq", unique = true, nullable = false)
    private Long productSeq;

    // 사업체 참조키
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_seq")
    private Company company;

    // 상품명
    @Column(name = "product_name", length = 30, nullable = false)
    private String productName;

    // 중량
    @Column(name = "product_weight", nullable = false)
    private Double productWeight;

}
