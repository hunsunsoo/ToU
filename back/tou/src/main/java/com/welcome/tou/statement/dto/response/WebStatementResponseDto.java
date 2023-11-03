package com.welcome.tou.statement.dto.response;

import com.welcome.tou.statement.domain.Item;
import com.welcome.tou.statement.domain.Statement;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.text.DecimalFormat;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WebStatementResponseDto {

    private Long statementSeq;
    private String companyName;
    private String workerName;
    private String itemName;
    private String totalPrice;
    private LocalDateTime tradeDate;
    private Statement.StatementStatus statementStatus;


    public static WebStatementResponseDto from(Statement statement, String totalPrice) {
        WebStatementResponseDto response = new WebStatementResponseDto();
        response.statementSeq = statement.getStatementSeq();
        response.companyName = statement.getResBranch().getCompany().getCompanyName();
        response.workerName = statement.getReqWorker().getWorkerName();
        List<Item> items = statement.getItems();
        if (items.size() != 0) {
            response.itemName = items.get(items.size() - 1).getStock().getStockName() + " 외" + (items.size() - 1) + "건";
            response.totalPrice = totalPrice;
        } else {
            response.itemName = "목록 없음";
            response.totalPrice = "0";
        }

        response.tradeDate = statement.getTradeDate();
        response.statementStatus = statement.getStatementStatus();

        return response;
    }
}
