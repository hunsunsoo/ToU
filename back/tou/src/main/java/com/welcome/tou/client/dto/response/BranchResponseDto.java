package com.welcome.tou.client.dto.response;

import lombok.*;

@RequiredArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class BranchResponseDto {

    private Long branchSeq;
    private String branchName;
}
