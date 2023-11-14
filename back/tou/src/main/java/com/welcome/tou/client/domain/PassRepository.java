package com.welcome.tou.client.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PassRepository extends JpaRepository<Pass, Long> {

    Optional<Pass> findByPassId(String PassId);
}
