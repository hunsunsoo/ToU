package com.welcome.tou.client.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface BranchRepository extends JpaRepository<Branch, Long> {

    @Query("select b from Branch b "
           +"where b.company.companySeq = :companySeq")
    List<Branch> findByCompanySeq(@Param("companySeq") Long companySeq);


    @Query("select b from Branch b "
            + "where b.company.companySeq = :companySeq "
            + "and b.branchType in :branchType")
    List<Branch> findByCompanySeqAndRole(@Param("companySeq") Long companySeq,
                                         @Param("branchType") List<Branch.BranchType> branchTypes);

    @Query("select b from Branch b "
            + "where b.channelCode = :channelCode")
    Optional<Branch> findByChannelCode(@Param("channelCode") String channelCode);


}
