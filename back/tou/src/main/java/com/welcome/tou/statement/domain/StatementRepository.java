package com.welcome.tou.statement.domain;

import com.welcome.tou.statement.dto.response.BranchTradeCountResponseDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface StatementRepository extends JpaRepository<Statement, Long> {

    @Query("select new com.welcome.tou.statement.dto.response.BranchTradeCountResponseDto(s.resBranch.branchName, count(s)) "
           + "from Statement s "
           + "where s.reqBranch.branchSeq = :branchSeq "
           + "group by s.resBranch.branchName")
    List<BranchTradeCountResponseDto> findResBranchTradeCountByReqBranch(@Param("branchSeq") Long branchSeq);

    @Query("select new com.welcome.tou.statement.dto.response.BranchTradeCountResponseDto(s.reqBranch.branchName, count(s)) "
           + "from Statement s "
           + "where s.resBranch.branchSeq = :branchSeq "
           + "group by s.reqBranch.branchName")
    List<BranchTradeCountResponseDto> findReqBranchTradeCountByResBranch(@Param("branchSeq") Long branchSeq);

    @Query("SELECT s FROM Statement s "
            + "WHERE s.reqBranch.branchSeq IN :branchSeq")
    List<Statement> findStatementsByBranchSeq(@Param("branchSeq") List<Long> branchSeqList);

}
