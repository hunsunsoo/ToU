package com.welcome.tou.statement.domain;

import com.querydsl.core.QueryResults;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import static com.welcome.tou.statement.domain.QStatement.statement;

@Repository
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class StatementQueryRepository {

    private final JPAQueryFactory queryFactory;

    public Page<Statement> findWithFilteringAndPagination( Pageable pageable, Long companySeq, Statement.StatementStatus status){
        QStatement statement = QStatement.statement;

        QueryResults<Statement> results = queryFactory.selectFrom(statement)
                .where(companyEq(companySeq), statusEq(status))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetchResults();

        return new PageImpl<>(results.getResults(), pageable, results.getTotal());

    }
    private BooleanExpression companyEq(Long companySeq) {
        return companySeq != null ? statement.resBranch.company.companySeq.eq(companySeq) : null;
    }

    private BooleanExpression statusEq(Statement.StatementStatus status) {
        return status != null ? statement.statementStatus.eq(status) : null;
    }
}
