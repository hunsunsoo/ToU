package com.welcome.tou.client.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "SCHEDULE")
public class Schedule {

    // 일정 일련번호
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "schedule_seq", unique = true, nullable = false)
    private Long scheduleSeq;

    // 관할구역 참조키
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "branch_seq")
    private Branch branch;

    // 일정 일자
    @Column(name = "schedule_date", nullable = false)
    private LocalDateTime scheduleDate;

    // 일정 제목
    @Column(name = "schedule_title", length = 50, nullable = false)
    private String scheduleTitle;

    // 일정 내용
    @Column(name = "schedule_content", nullable = false)
    private String scheduleContent;

    // 일정 타입
    @Enumerated(EnumType.STRING)
    @Column(name = "schedule_type", length = 10, nullable = false)
    private ScheduleType scheduleType;


    public enum ScheduleType {
        RELEASING, RECEIVING
    }
}
