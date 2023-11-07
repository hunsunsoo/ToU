package com.welcome.tou.client.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QBranch is a Querydsl query type for Branch
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QBranch extends EntityPathBase<Branch> {

    private static final long serialVersionUID = 1326525750L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QBranch branch = new QBranch("branch");

    public final StringPath branchContact = createString("branchContact");

    public final StringPath branchLocation = createString("branchLocation");

    public final StringPath branchName = createString("branchName");

    public final NumberPath<Long> branchSeq = createNumber("branchSeq", Long.class);

    public final EnumPath<Branch.BranchType> branchType = createEnum("branchType", Branch.BranchType.class);

    public final StringPath channelCode = createString("channelCode");

    public final QCompany company;

    public final NumberPath<java.math.BigDecimal> latitude = createNumber("latitude", java.math.BigDecimal.class);

    public final NumberPath<java.math.BigDecimal> longitude = createNumber("longitude", java.math.BigDecimal.class);

    public QBranch(String variable) {
        this(Branch.class, forVariable(variable), INITS);
    }

    public QBranch(Path<? extends Branch> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QBranch(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QBranch(PathMetadata metadata, PathInits inits) {
        this(Branch.class, metadata, inits);
    }

    public QBranch(Class<? extends Branch> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.company = inits.isInitialized("company") ? new QCompany(forProperty("company")) : null;
    }

}

