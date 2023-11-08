package com.welcome.tou.consumer;


import com.welcome.tou.client.service.ClientService;
import com.welcome.tou.common.utils.ResultTemplate;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/consumer")
public class ConsumerController {

    private final ConsumerService consumerService;

    @GetMapping("/{articleSeq}")
    public ResultTemplate<?> getDistributionProcess(@PathVariable Long articleSeq) {
        return consumerService.getDistributionProcess(articleSeq);
    }

}
