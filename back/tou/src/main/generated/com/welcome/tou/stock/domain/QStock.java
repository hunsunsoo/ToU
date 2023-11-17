package com.welcome.tou.stock.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QStock is a Querydsl query type for Stock
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QStock extends EntityPathBase<Stock> {

    private static final long serialVersionUID = 2088789073L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QStock stock = new QStock("stock");

    public final com.welcome.tou.client.domain.QBranch branch;

    public final com.welcome.tou.client.domain.QBranch fromBranch;

    public final EnumPath<Stock.InOutStatus> inOutStatus = createEnum("inOutStatus", Stock.InOutStatus.class);

    public final StringPath stockCode = createString("stockCode");

    public final DateTimePath<java.time.LocalDateTime> stockDate = createDateTime("stockDate", java.time.LocalDateTime.class);

    public final StringPath stockName = createString("stockName");

    public final NumberPath<Long> stockPrice = createNumber("stockPrice", Long.class);

    public final NumberPath<Double> stockQuantity = createNumber("stockQuantity", Double.class);

    public final NumberPath<Long> stockSeq = createNumber("stockSeq", Long.class);

    public final StringPath stockUnit = createString("stockUnit");

    public final EnumPath<Stock.UseStatus> useStatus = createEnum("useStatus", Stock.UseStatus.class);

    public QStock(String variable) {
        this(Stock.class, forVariable(variable), INITS);
    }

    public QStock(Path<? extends Stock> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QStock(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QStock(PathMetadata metadata, PathInits inits) {
        this(Stock.class, metadata, inits);
    }

    public QStock(Class<? extends Stock> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.branch = inits.isInitialized("branch") ? new com.welcome.tou.client.domain.QBranch(forProperty("branch"), inits.get("branch")) : null;
        this.fromBranch = inits.isInitialized("fromBranch") ? new com.welcome.tou.client.domain.QBranch(forProperty("fromBranch"), inits.get("fromBranch")) : null;
    }

}

