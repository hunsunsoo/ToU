package com.welcome.tou.stock.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AverageRepository extends JpaRepository<Average, Long> {

    @Query("select a from Average a where a.branch.branchSeq =:branchSeq AND a.averageDate >= :sixMonthsAgo")
    List<Average> findRecentSixMonthsByBranch(@Param("branchSeq") Long branchSeq, @Param("sixMonthsAgo") LocalDateTime sixMonthsAgo);
}
