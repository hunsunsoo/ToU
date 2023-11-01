package com.welcome.tou.stock.domain;

import com.welcome.tou.client.domain.Branch;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "STOCK")
public class Stock {

    // 재고 일련번호
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "stock_seq", unique = true, nullable = false)
    private Long stockSeq;


    // 관할구역 참조키
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "branch_seq")
    private Branch branch;

    //입고업체 관할구역 참조키
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "from_branch_seq")
    private Branch fromBranch;

    // 재고명
    @Column(name = "stock_name", length = 50, nullable = false)
    private String stockName;

    // 재고 고유코드
    @Column(name = "stock_code", length = 50, nullable = false)
    private String stockCode;

    // 재고량
    @Column(name = "stock_quantity", nullable = false)
    private Double stockQuantity;

    // 재고단위
    @Column(name = "stock_unit", length = 5, nullable = false)
    private String stockUnit;

    // 단가
    @Column(name = "stock_price", nullable = false)
    private Long stockPrice;

    // 재고 생성일시
    @Column(name = "stock_date", nullable = false)
    private LocalDateTime stockDate;

    // 입출여부
    @Enumerated(EnumType.STRING)
    @Column(name = "inout_status", length = 5, nullable = false)
    private InOutStatus inOutStatus;

    // 사용여부
    @Enumerated(EnumType.STRING)
    @Column(name = "use_status", length = 10, nullable = false)
    private UseStatus useStatus;


    public enum InOutStatus {
        IN, OUT
    }

    public enum UseStatus {
        USED, UNUSED
    }

    public static Stock createStock(
                                    Branch branch,
                                    String stockName,
                                    String stockCode,
                                    Double stockQuantity,
                                    String stockUnit,
                                    LocalDateTime stockDate,
                                    Long stockPrice,
                                    InOutStatus inOutStatus,
                                    UseStatus useStatus) {
        Stock stock = new Stock();
        stock.branch = branch;
        stock.stockName = stockName;
        stock.stockCode = stockCode;
        stock.stockQuantity = stockQuantity;
        stock.stockUnit = stockUnit;
        stock.stockDate = stockDate;
        stock.stockPrice = stockPrice;
        stock.inOutStatus = inOutStatus;
        stock.useStatus = useStatus;
        return stock;

    }
}
