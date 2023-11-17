package com.welcome.tou.client.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QPass is a Querydsl query type for Pass
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QPass extends EntityPathBase<Pass> {

    private static final long serialVersionUID = -270843739L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QPass pass = new QPass("pass");

    public final StringPath passId = createString("passId");

    public final QWorker worker;

    public final NumberPath<Long> workerSeq = createNumber("workerSeq", Long.class);

    public QPass(String variable) {
        this(Pass.class, forVariable(variable), INITS);
    }

    public QPass(Path<? extends Pass> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QPass(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QPass(PathMetadata metadata, PathInits inits) {
        this(Pass.class, metadata, inits);
    }

    public QPass(Class<? extends Pass> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.worker = inits.isInitialized("worker") ? new QWorker(forProperty("worker"), inits.get("worker")) : null;
    }

}

