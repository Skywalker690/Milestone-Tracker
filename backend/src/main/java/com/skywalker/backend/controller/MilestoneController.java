package com.skywalker.backend.controller;

import com.skywalker.backend.dto.MilestoneDTO;
import com.skywalker.backend.model.Milestone;
import com.skywalker.backend.model.User;
import com.skywalker.backend.service.MilestoneService;
import com.skywalker.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/milestones")
@RequiredArgsConstructor
public class MilestoneController {

    private final MilestoneService milestoneService;
    private final UserService userService;

    // Create a new milestone
    @PostMapping
    public ResponseEntity<MilestoneDTO> createMilestone(@RequestBody MilestoneDTO dto) {
        // Get currently logged-in user
        User currentUser = userService.getCurrentUser();

        // Map DTO to entity
        Milestone milestone = new Milestone();
        milestone.setTitle(dto.getTitle());
        milestone.setDescription(dto.getDescription());
        milestone.setAchieveDate(dto.getAchieveDate());
        milestone.setUser(currentUser); // associate with logged-in user

        // Save and return DTO
        MilestoneDTO created = milestoneService.createMilestone(milestone);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    // Get all milestones
    @GetMapping
    public ResponseEntity<List<MilestoneDTO>> getAllMilestones() {
        List<MilestoneDTO> milestones = milestoneService.getAllMilestones();
        return ResponseEntity.ok(milestones);
    }

    // Get milestone by ID
    @GetMapping("/{id}")
    public ResponseEntity<MilestoneDTO> getMilestoneById(@PathVariable Long id) {
        return milestoneService.getMilestoneById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Update milestone
    @PutMapping("/{id}")
    public ResponseEntity<MilestoneDTO> updateMilestone(@PathVariable Long id, @RequestBody MilestoneDTO dto) {
        Milestone milestone = new Milestone();
        milestone.setTitle(dto.getTitle());
        milestone.setDescription(dto.getDescription());
        milestone.setAchieveDate(dto.getAchieveDate());
        milestone.setCompleted(dto.isCompleted());
        milestone.setCompletedDate(dto.getCompletedDate());

        return milestoneService.updateMilestone(id, milestone)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Delete milestone
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMilestone(@PathVariable Long id) {
        milestoneService.deleteMilestone(id);
        return ResponseEntity.noContent().build();
    }
}
