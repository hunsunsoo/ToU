package com.welcome.tou.statement.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QStatement is a Querydsl query type for Statement
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QStatement extends EntityPathBase<Statement> {

    private static final long serialVersionUID = 971836785L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QStatement statement = new QStatement("statement");

    public final StringPath blockSeq = createString("blockSeq");

    public final DateTimePath<java.time.LocalDateTime> createdDate = createDateTime("createdDate", java.time.LocalDateTime.class);

    public final ListPath<Item, QItem> items = this.<Item, QItem>createList("items", Item.class, QItem.class, PathInits.DIRECT2);

    public final com.welcome.tou.client.domain.QBranch reqBranch;

    public final DateTimePath<java.time.LocalDateTime> reqDate = createDateTime("reqDate", java.time.LocalDateTime.class);

    public final com.welcome.tou.client.domain.QWorker reqWorker;

    public final com.welcome.tou.client.domain.QBranch resBranch;

    public final DateTimePath<java.time.LocalDateTime> resDate = createDateTime("resDate", java.time.LocalDateTime.class);

    public final com.welcome.tou.client.domain.QWorker resWorker;

    public final NumberPath<Long> statementSeq = createNumber("statementSeq", Long.class);

    public final EnumPath<Statement.StatementStatus> statementStatus = createEnum("statementStatus", Statement.StatementStatus.class);

    public final DateTimePath<java.time.LocalDateTime> tradeDate = createDateTime("tradeDate", java.time.LocalDateTime.class);

    public QStatement(String variable) {
        this(Statement.class, forVariable(variable), INITS);
    }

    public QStatement(Path<? extends Statement> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QStatement(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QStatement(PathMetadata metadata, PathInits inits) {
        this(Statement.class, metadata, inits);
    }

    public QStatement(Class<? extends Statement> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.reqBranch = inits.isInitialized("reqBranch") ? new com.welcome.tou.client.domain.QBranch(forProperty("reqBranch"), inits.get("reqBranch")) : null;
        this.reqWorker = inits.isInitialized("reqWorker") ? new com.welcome.tou.client.domain.QWorker(forProperty("reqWorker"), inits.get("reqWorker")) : null;
        this.resBranch = inits.isInitialized("resBranch") ? new com.welcome.tou.client.domain.QBranch(forProperty("resBranch"), inits.get("resBranch")) : null;
        this.resWorker = inits.isInitialized("resWorker") ? new com.welcome.tou.client.domain.QWorker(forProperty("resWorker"), inits.get("resWorker")) : null;
    }

}

