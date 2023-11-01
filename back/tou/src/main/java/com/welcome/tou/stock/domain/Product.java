package com.welcome.tou.stock.domain;

import com.welcome.tou.client.domain.Branch;
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

    // 관할구역 참조키
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "branch_seq")
    private Branch branch;

    // 상품명
    @Column(name = "product_name", length = 30, nullable = false)
    private String productName;

    // 중량
    @Column(name = "product_weight", nullable = false)
    private Double productWeight;

    public static Product createProduct(Branch branch, String productName, Double productWeight) {
        Product product = new Product();
        product.branch = branch;
        product.productName = productName;
        product.productWeight = productWeight;
        return product;
    }

}
