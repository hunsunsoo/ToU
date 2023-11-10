package com.welcome.tou.statement.domain;

import com.querydsl.core.QueryResults;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;

import static com.welcome.tou.statement.domain.QStatement.statement;
@Slf4j
@Repository
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class StatementQueryRepository {

    private final JPAQueryFactory queryFactory;

    public Page<Statement> findWithFilteringAndPagination(
            Pageable pageable, Long branchSeq, String type, String companyName, String myWorkerName,
            String otherWorkerName, Boolean isMine, Long workerSeq, LocalDate startDate, LocalDate endDate,
            Statement.StatementStatus status, String productName){
        QStatement statement = QStatement.statement;

        log.info("endDate of querydsl :{} ", endDate);

        QueryResults<Statement> results = queryFactory.selectFrom(statement)
                .where(
                        branchSeqEq(branchSeq, type),
                        companyContain(companyName), statusEq(status),
                        isMine(isMine,type, workerSeq),
                        myWorkerContain(myWorkerName, type), otherWorkerContain(otherWorkerName, type),
                        dateFrom(startDate), dateTo(endDate),
                        hasProduct(productName))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetchResults();

        return new PageImpl<>(results.getResults(), pageable, results.getTotal());

    }
    private BooleanExpression companyContain(String companyName) {
        return companyName != null ? statement.resBranch.company.companyName.contains(companyName) : null;
    }

    private BooleanExpression statusEq(Statement.StatementStatus status) {
        return status != null ? statement.statementStatus.ne(Statement.StatementStatus.DELETE).and(statement.statementStatus.eq(status)) : null;
    }

    private BooleanExpression isMine(boolean isMine, String type, Long workerSeq){
        if ("req".equals(type)) {
            return isMine ? statement.reqWorker.workerSeq.eq(workerSeq) : null;
        } else {
            return !isMine  ? statement.resWorker.workerSeq.eq(workerSeq) : null;
        }
    }
    private BooleanExpression branchSeqEq(Long branchSeq, String type){
        if ("req".equals(type)) {
            return branchSeq!=null ? statement.reqBranch.branchSeq.eq(branchSeq) : null;
        } else {
            return branchSeq!=null  ? statement.resBranch.branchSeq.eq(branchSeq) : null;
        }
    }

    private BooleanExpression hasProduct(String productName){
        return productName != null ? statement.items.any().stock.stockName.contains(productName) : null;
    }


    private BooleanExpression myWorkerContain(String myWorkerName, String type) {
        if ("req".equals(type)) {
            return myWorkerName != null ? statement.reqWorker.workerName.contains(myWorkerName) : null;
        } else {
            return myWorkerName != null ? statement.resWorker.workerName.contains(myWorkerName) : null;
        }
    }

    private BooleanExpression otherWorkerContain(String otherWorkerName, String type) {
        if ("req".equals(type)) {
            return otherWorkerName != null ? statement.resWorker.workerName.contains(otherWorkerName) : null;
        } else {
            return otherWorkerName != null ? statement.reqWorker.workerName.contains(otherWorkerName) : null;
        }
    }

    private BooleanExpression dateFrom(LocalDate startDate) {
        if (startDate != null) {
            LocalDateTime startDateTime = startDate.atStartOfDay();

            return statement.tradeDate.goe(startDateTime);
        } else {
            return null;
        }
    }

    private BooleanExpression dateTo(LocalDate endDate) {

        if (endDate != null) {
            LocalDateTime endDateTime = endDate.atTime(23, 59, 59, 9999999); // endDate의 종료 시간
            log.info("endDateTime in querydsl : {}", endDateTime);
            return statement.tradeDate.loe(endDateTime);
        } else {
            return null;
        }
    }
}
