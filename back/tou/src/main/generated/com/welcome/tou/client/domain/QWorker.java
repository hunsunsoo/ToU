package com.welcome.tou.client.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QWorker is a Querydsl query type for Worker
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QWorker extends EntityPathBase<Worker> {

    private static final long serialVersionUID = 1925470994L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QWorker worker = new QWorker("worker");

    public final StringPath biometrics = createString("biometrics");

    public final QBranch branch;

    public final QCompany company;

    public final StringPath email = createString("email");

    public final StringPath loginId = createString("loginId");

    public final StringPath password = createString("password");

    public final StringPath phone = createString("phone");

    public final StringPath refreshToken = createString("refreshToken");

    public final EnumPath<Worker.Role> role = createEnum("role", Worker.Role.class);

    public final StringPath workerName = createString("workerName");

    public final NumberPath<Long> workerSeq = createNumber("workerSeq", Long.class);

    public QWorker(String variable) {
        this(Worker.class, forVariable(variable), INITS);
    }

    public QWorker(Path<? extends Worker> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QWorker(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QWorker(PathMetadata metadata, PathInits inits) {
        this(Worker.class, metadata, inits);
    }

    public QWorker(Class<? extends Worker> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.branch = inits.isInitialized("branch") ? new QBranch(forProperty("branch"), inits.get("branch")) : null;
        this.company = inits.isInitialized("company") ? new QCompany(forProperty("company")) : null;
    }

}

