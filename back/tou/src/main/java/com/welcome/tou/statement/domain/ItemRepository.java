package com.welcome.tou.statement.domain;

import com.welcome.tou.stock.domain.Stock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Long> {

    @Query("select i.stock from Item i where i.statement.statementSeq = :statementSeq")
    List<Stock> findStockByStatementSeq(@Param("statementSeq") Long statementSeq);

}
