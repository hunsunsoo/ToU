package com.welcome.tou.stock.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("select p from Product p " + "where p.branch.branchSeq =:branchSeq")
    List<Product> findByBranch(@Param("branchSeq") Long branchSeq);


}
