package com.welcome.tou.consumer.dto;

import lombok.*;


@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class FabricAssetDto {

    private String assetId;
    private String previousAssetId;
    private Long statementSeq;
    private Long branchSeq;
    private String branchLocation;
    private String branchName;
    private String branchContact;
    private String stockName;
    private Long stockQuantity;
    private String stockUnit;
    private String stockDate;
    private String inoutStatus;
    private String useStatus;
    private double latitude;
    private double longitude;
}
