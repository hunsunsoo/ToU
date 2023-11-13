package com.welcome.tou.consumer;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.welcome.tou.client.domain.Branch;
import com.welcome.tou.client.domain.BranchRepository;
import com.welcome.tou.common.exception.InvalidDistributionCodeException;
import com.welcome.tou.common.exception.NotFoundException;
import com.welcome.tou.common.utils.ResultTemplate;
import com.welcome.tou.consumer.dto.*;
import com.welcome.tou.stock.domain.Stock;
import com.welcome.tou.stock.domain.StockRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

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

        List<ConsumerResponseDto> distribution = DPbranchList.stream().map(dpBranch -> {
            return ConsumerResponseDto.builder()
                    .branchSeq(dpBranch.getBranchSeq())
                    .branchLocation(dpBranch.getBranchLocation())
                    .branchName(dpBranch.getBranchName())
                    .branchType(dpBranch.getBranchType().name())
                    .longitude(dpBranch.getLongitude())
                    .latitude(dpBranch.getLatitude())
                    .build();
        }).collect(Collectors.toList());

        ConsumerProductResponseDto responseDto = ConsumerProductResponseDto.builder()
                .productName(stock.getStockName())
                .distribution(distribution)
                .build();


        return ResultTemplate.builder().status(200).data(responseDto).build();

    }

    public ResultTemplate<?> getDistributionProcessByFabric(Long articleSeq) {
        RestTemplate restTemplate = new RestTemplate();
        ObjectMapper objectMapper = new ObjectMapper();

        List<FabricAssetDto> assets = new ArrayList<>();

        for (int i = 0; i < 4; i++) {
            String url = "http://k9b310a.p.ssafy.io:8080/api/ledger/asset/";

            if (i > 0) {
                url += assets.get(i - 1).getPreviousAssetId();
            } else {
                url += articleSeq;
            }

            ResponseEntity<ResultTemplate<String>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<ResultTemplate<String>>() {
            });

            if(response.getBody().getStatus() != 200) {
                throw new NotFoundException(NotFoundException.ASSET_ID_NOT_FOUND);
            }

            String data = response.getBody().getData();
            FabricAssetDto asset = null;

            try {
                asset = objectMapper.readValue(data, FabricAssetDto.class);
            } catch (JsonProcessingException e) {
                return ResultTemplate.builder().status(HttpStatus.BAD_REQUEST.value()).data("Json을 asset으로 변환하는데 실패했습니다.").build();
            }

            assets.add(asset);
        }

        List<ConsumerResponseByFabricDto> distribution = new ArrayList<>();

        for (int i = 3; i >= 0; i--) {
            FabricAssetDto asset = assets.get(i);
            Branch.BranchType branchType;
            if(i==0) branchType = Branch.BranchType.SELL;
            else if(i==1) branchType = Branch.BranchType.PACKAGING;
            else if(i==2) branchType = Branch.BranchType.PROCESS;
            else branchType = Branch.BranchType.PRODUCT;
            ConsumerResponseByFabricDto dto = ConsumerResponseByFabricDto.builder()
                    .branchSeq(asset.getBranchSeq())
                    .branchLocation(asset.getBranchLocation())
                    .branchName(asset.getBranchName())
                    .branchType(branchType.name())
                    .longitude(asset.getLongitude())
                    .latitude(asset.getLatitude())
                    .stockDate(asset.getStockDate())
                    .build();

            distribution.add(dto);
        }

        ConsumerProductResponseByFabricDto responseDto = ConsumerProductResponseByFabricDto.builder()
                .productName(assets.get(0).getStockName())
                .distribution(distribution)
                .build();

        return ResultTemplate.builder().status(200).data(responseDto).build();
    }

}
