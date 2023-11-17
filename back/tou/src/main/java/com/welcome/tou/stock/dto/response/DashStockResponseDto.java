package com.welcome.tou.stock.dto.response;

import com.welcome.tou.stock.domain.Stock;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashStockResponseDto {
    private String stockName;
    private String fromCompanyName;
    private String fromBranchName;
    private LocalDateTime stockDate;
    private Long stockPrice;
    private Double stockQuantity;
    private String stockUnit;

    public static DashStockResponseDto from(Stock stock){
        DashStockResponseDto response = new DashStockResponseDto();
        response.stockName = stock.getStockName();
        response.fromBranchName = stock.getFromBranch().getBranchName();
        response.fromCompanyName = stock.getFromBranch().getCompany().getCompanyName();
        response.stockDate = stock.getStockDate();
        response.stockPrice = stock.getStockPrice();
        response.stockQuantity = stock.getStockQuantity();
        response.stockUnit = stock.getStockUnit();

        return response;
    }
}
