package com.welcome.tou.client.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QSchedule is a Querydsl query type for Schedule
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QSchedule extends EntityPathBase<Schedule> {

    private static final long serialVersionUID = -1486551765L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QSchedule schedule = new QSchedule("schedule");

    public final QBranch branch;

    public final StringPath scheduleContent = createString("scheduleContent");

    public final DateTimePath<java.time.LocalDateTime> scheduleDate = createDateTime("scheduleDate", java.time.LocalDateTime.class);

    public final NumberPath<Long> scheduleSeq = createNumber("scheduleSeq", Long.class);

    public final StringPath scheduleTitle = createString("scheduleTitle");

    public final EnumPath<Schedule.ScheduleType> scheduleType = createEnum("scheduleType", Schedule.ScheduleType.class);

    public QSchedule(String variable) {
        this(Schedule.class, forVariable(variable), INITS);
    }

    public QSchedule(Path<? extends Schedule> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QSchedule(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QSchedule(PathMetadata metadata, PathInits inits) {
        this(Schedule.class, metadata, inits);
    }

    public QSchedule(Class<? extends Schedule> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.branch = inits.isInitialized("branch") ? new QBranch(forProperty("branch"), inits.get("branch")) : null;
    }

}

