package com.welcome.tou.consumer;

import com.welcome.tou.client.domain.Branch;
import com.welcome.tou.client.domain.BranchRepository;
import com.welcome.tou.common.exception.InvalidDistributionCodeException;
import com.welcome.tou.common.exception.InvalidStockException;
import com.welcome.tou.common.exception.NotFoundException;
import com.welcome.tou.common.utils.ResultTemplate;
import com.welcome.tou.stock.domain.Stock;
import com.welcome.tou.stock.domain.StockRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ConsumerService {

    private final StockRepository stockRepository;
    private final BranchRepository branchRepository;

    public ResultTemplate<?> getDistributionProcess(Long articleSeq){
        Stock stock = stockRepository.findById(articleSeq)
                .orElseThrow(() -> new NotFoundException("존재하지 않는 상품입니다."));

        String DPcode = stock.getStockCode();

        // 코드 유효성 검증
        if(DPcode.length() % 4 != 0){
            throw new InvalidDistributionCodeException(InvalidDistributionCodeException.INVALID_DISTRIBUTION_CODE_FORM + "- 4배수의 길이가 아님");
        }
        for(int si=0; si<DPcode.length(); si++){
            char check = DPcode.charAt(si);
            if(si % 4 == 0){
                if(!Character.isUpperCase(check) ) {
                    throw new InvalidDistributionCodeException(InvalidDistributionCodeException.INVALID_DISTRIBUTION_CODE_FORM + "- 첫글자가 대문자가 아님");
                }
            } else {
                if(!Character.isDigit(check)) {
                    throw new InvalidDistributionCodeException(InvalidDistributionCodeException.INVALID_DISTRIBUTION_CODE_FORM + "- 세자리의 숫자가 아님");
                }
            }
        }

        List<String> DPcodeList = new ArrayList<>();
        for(int si=0; si<DPcode.length(); si+=4){
            String segment = DPcode.substring(si, si+4);
            System.out.println(segment);
            DPcodeList.add(segment);
        }

        List<Branch> DPbranchList = DPcodeList.stream().map(dp -> {
            Branch branch = branchRepository.findByChannelCode(dp)
                    .orElseThrow(() -> {
                        throw new NotFoundException(NotFoundException.BRANCH_NOT_FOUND);
                    });
            return branch;
        }).collect(Collectors.toList());

        List<ConsumerResponseDto> responseDto = DPbranchList.stream().map(dpBranch -> {
            return ConsumerResponseDto.builder()
                    .branchSeq(dpBranch.getBranchSeq())
                    .branchLocation(dpBranch.getBranchLocation())
                    .branchName(dpBranch.getBranchName())
                    .branchType(dpBranch.getBranchType().name())
                    .longitude(dpBranch.getLongitude())
                    .latitude(dpBranch.getLatitude())
                    .build();
        }).collect(Collectors.toList());



        return ResultTemplate.builder().status(200).data(responseDto).build();

    }
}
