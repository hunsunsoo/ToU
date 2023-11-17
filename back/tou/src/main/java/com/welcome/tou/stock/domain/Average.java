package com.welcome.tou.stock.domain;

import com.welcome.tou.client.domain.Branch;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "AVERAGE")
public class Average {

    // 입고평균 일련번호
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "average_seq", unique = true, nullable = false)
    private Long averageSeq;

    // 관할구역 참조키
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "branch_seq")
    private Branch branch;

    // 품목명
    @Column(name = "average_product_name", nullable = false)
    private String averageProductName;

    // 년월
    @Column(name = "average_date", nullable = false)
    private LocalDateTime averageDate;

    // 평균입고단가
    @Column(name = "average_product_price", nullable = false)
    private Long averageProductPrice;
}
