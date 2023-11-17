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
                   +"where s.branch.branchSeq = :branchSeq " + "and s.inOutStatus = :inOutStatus "
                   +"and s.useStatus = :useStatus " + "order by s.stockSeq")
    List<Stock> findStockByBranchAndInOutStatusAndUseStatus(@Param("branchSeq") Long branchSeq,
                                                            @Param("inOutStatus") Stock.InOutStatus inOutStatus,
                                                            @Param("useStatus") Stock.UseStatus useStatus);

    @Query(value = "select s from Stock s "
                   +"where s.stockName = :stockName and s.inOutStatus = 'IN' "
                   + "order by s.stockSeq ")
    List<Stock> findByStockName(@Param("stockName") String stockName);


    @Query("select s from Stock s "
           + "where s.branch.branchSeq =:branchSeq and s.inOutStatus = 'IN' "
           + "and s.stockSeq in "
           +"(select max(st.stockSeq) from Stock st where st.stockName = s.stockName group by st.stockName)")
    List<Stock> findDistinctByBranch(@Param("branchSeq") Long branchSeq);

    @Query(value = "select s from Stock s "
                   +"where s.branch.branchSeq = :branchSeq "
                   + "order by s.stockSeq "
                   + "limit 5")
    List<Stock> findByBranchLimit5(@Param("branchSeq") Long branchSeq);

    @Query(value = "select s from Stock s "
            +"where s.branch.branchSeq = :branchSeq and s.useStatus = 'UNUSED' "
            + "order by s.stockSeq ")
    List<Stock> findByBranchUnused(@Param("branchSeq") Long branchSeq);

}
