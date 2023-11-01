package com.welcome.tou.client.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface WorkerRepository extends JpaRepository<Worker, Long> {

    Optional<Worker> findByLoginId(String loginId);
}
