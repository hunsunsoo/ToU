package com.welcome.tou.stock.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StockRepository extends JpaRepository<Stock, Long> {


    @Query(value = "select s from Stock s "
                   +"where s.branch.branchSeq = :branchSeq and s.inOutStatus = 'IN' "
                   +"and s.useStatus = 'UNUSED'")
    List<Stock> findStockByBranchAndInOutStatusAndUseStatus(@Param("branchSeq") Long branchSeq);

}
