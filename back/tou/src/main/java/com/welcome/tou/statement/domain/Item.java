package com.welcome.tou.statement.domain;

import com.welcome.tou.stock.domain.Stock;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "ITEM")
public class Item {

    // 품목 일련번호
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "item_seq", unique = true, nullable = false)
    private Long itemSeq;

    // 거래 명세서 참조키
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "statement_seq")
    private Statement statement;

    // 재고 참조키
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stock_seq")
    private Stock stock;

    // 비고
    @Column(name = "note")
    private String note;

    public static Item createItem(Statement statement, Stock stock) {
        Item item = new Item();
        item.statement = statement;
        item.stock = stock;
        return item;
    }
}
