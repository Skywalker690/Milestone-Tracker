package com.skywalker.backend.controller;

import com.skywalker.backend.model.Milestone;
import com.skywalker.backend.service.MilestoneService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class MilestoneController {

    private final MilestoneService service;

    @GetMapping("/milestones")
    public List<Milestone> getAllMilestones(){
        return service.
    }

    @GetMapping("milestones/{id}")
    public Milestone getMilestoneById(){
        return
    }

    @GetMapping("/milestones")
    public Milestone createMilestone(){
        return
    }

    @GetMapping("milestones/{id}")
    public Milestone updateMilestone(){
        return
    }

    @GetMapping("/milestones")
    public Milestone deleteMilestone(){
        return
    }
}
