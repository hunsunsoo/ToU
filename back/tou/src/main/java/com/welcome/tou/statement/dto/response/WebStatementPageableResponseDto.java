package com.welcome.tou.statement.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.awt.print.Pageable;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WebStatementPageableResponseDto {

    private long totalElements;
    private int totalPages;
    private int currentPage;
    private int size;
    private boolean first;
    private boolean last;
    private boolean hasNext;
    private boolean hasPrevious;
    private int startPage; // 추가: 표시될 시작 페이지 번호
    private int endPage;   // 추가: 표시될 끝 페이지 번호
    private int pre;
    private int next;
    private int start;
    private List<WebStatementResponseDto> statementList;
}
