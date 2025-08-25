package com.skywalker.backend.repository;

import com.skywalker.backend.model.Milestone;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MilestoneRepository extends JpaRepository<Milestone,Integer> {
}
