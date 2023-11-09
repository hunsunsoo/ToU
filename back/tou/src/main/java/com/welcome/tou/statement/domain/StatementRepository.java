package com.welcome.tou.statement.domain;

import com.welcome.tou.client.domain.Branch;
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
            + "WHERE (s.reqBranch.branchSeq = :branchSeq "
            + "or s.resBranch.branchSeq = :branchSeq ) "
            + "and s.statementStatus != 'DELETE'")
    List<Statement> findAllStatementsByBranchSeq(@Param("branchSeq") Long branchSeq);


    @Query("SELECT s FROM Statement s "
            + "WHERE (s.reqBranch.branchSeq in :branchSeq "
            + "or s.resBranch.branchSeq in :branchSeq ) "
            + "and s.statementStatus = 'COMPLETION'")
    List<Statement> findAllStatementsByBranchListAndCompletion(@Param("branchSeq") List<Long> branchList);

    @Query("SELECT s FROM Statement s "
            + "WHERE s.reqBranch.branchSeq = :branchSeq "
            + "and s.statementStatus = 'PREPARING'")
    List<Statement> findStatementsByBranchSeqAndPreparing(@Param("branchSeq") Long branchSeq);

    @Query("SELECT s FROM Statement s "
            + "WHERE s.resBranch.branchSeq = :branchSeq "
            + "and s.statementStatus = 'WAITING'")
    List<Statement> findStatementsByBranchSeqAndWaiting(@Param("branchSeq") Long branchSeq);

    @Query("SELECT s FROM Statement s "
            + "WHERE (s.reqBranch.branchSeq = :branchSeq "
            + "or s.resBranch.branchSeq = :branchSeq ) "
            + "and YEAR(s.tradeDate) = :year "
            + "and MONTH(s.tradeDate) = :month "
            + "and s.statementStatus != 'DELETE'")
    List<Statement> findStatementsForSchedule(@Param("branchSeq") Long branchSeq, @Param("year") Integer year, @Param("month") Integer month);
}
