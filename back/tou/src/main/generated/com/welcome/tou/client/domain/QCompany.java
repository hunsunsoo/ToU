package com.welcome.tou.client.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QCompany is a Querydsl query type for Company
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QCompany extends EntityPathBase<Company> {

    private static final long serialVersionUID = -1014618263L;

    public static final QCompany company = new QCompany("company");

    public final StringPath companyContact = createString("companyContact");

    public final StringPath companyLocation = createString("companyLocation");

    public final StringPath companyName = createString("companyName");

    public final NumberPath<Long> companySeq = createNumber("companySeq", Long.class);

    public final StringPath logoImage = createString("logoImage");

    public final StringPath registrationNumber = createString("registrationNumber");

    public QCompany(String variable) {
        super(Company.class, forVariable(variable));
    }

    public QCompany(Path<? extends Company> path) {
        super(path.getType(), path.getMetadata());
    }

    public QCompany(PathMetadata metadata) {
        super(Company.class, metadata);
    }

}

