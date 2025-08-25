package com.skywalker.backend.controller;

import com.skywalker.backend.model.Milestone;
import com.skywalker.backend.service.MilestoneService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class MilestoneController {

    private final MilestoneService service;

    @GetMapping("/milestones")
    public List<Milestone> getAllMilestones(){
        return service.getAllMilestones();
    }

    @GetMapping("milestones/{id}")
    public Milestone getMilestoneById(@PathVariable int id){
        return service.getMilestoneById(id);
    }

    @PostMapping("/milestones")
    public Milestone createMilestone(@RequestBody Milestone milestone){
        return service.createMilestone(milestone);
    }

    @PutMapping("milestones/{id}")
    public Milestone updateMilestone(@PathVariable int id,@RequestBody Milestone milestone){
        return service.updateMilestone(id,milestone);
    }

    @DeleteMapping("/milestones/{id}")
    public String deleteMilestone(@PathVariable int id){
        return service.deleteMilestone(id);
    }
}
