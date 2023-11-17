package com.welcome.tou.stock.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QAverage is a Querydsl query type for Average
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QAverage extends EntityPathBase<Average> {

    private static final long serialVersionUID = -1465128808L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QAverage average = new QAverage("average");

    public final DateTimePath<java.time.LocalDateTime> averageDate = createDateTime("averageDate", java.time.LocalDateTime.class);

    public final StringPath averageProductName = createString("averageProductName");

    public final NumberPath<Long> averageProductPrice = createNumber("averageProductPrice", Long.class);

    public final NumberPath<Long> averageSeq = createNumber("averageSeq", Long.class);

    public final com.welcome.tou.client.domain.QBranch branch;

    public QAverage(String variable) {
        this(Average.class, forVariable(variable), INITS);
    }

    public QAverage(Path<? extends Average> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QAverage(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QAverage(PathMetadata metadata, PathInits inits) {
        this(Average.class, metadata, inits);
    }

    public QAverage(Class<? extends Average> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.branch = inits.isInitialized("branch") ? new com.welcome.tou.client.domain.QBranch(forProperty("branch"), inits.get("branch")) : null;
    }

}

