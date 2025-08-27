package com.skywalker.backend.controller;

import com.skywalker.backend.model.Milestone;
import com.skywalker.backend.model.User;
import com.skywalker.backend.service.MilestoneService;
import com.skywalker.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class MilestoneController {

    private final MilestoneService service;
    private final UserService userService;

    @GetMapping("/milestones")
    public ResponseEntity<List<Milestone>> getAllMilestones() {
        return ResponseEntity.ok(service.getAllMilestones());
    }


    @GetMapping("milestones/{id}")
    public ResponseEntity<Milestone> getMilestoneById(@PathVariable int id){
         return service.getMilestoneById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound()
                        .build());
    }

    @PostMapping("/milestones")
    public ResponseEntity<Milestone> createMilestone(@RequestBody Milestone milestone) {

        User currentUser = userService.getCurrentUser();
        milestone.setUser(currentUser);

        Milestone createdMilestone = service.createMilestone(milestone);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdMilestone);
    }

    @PutMapping("/milestones/{id}")
    public ResponseEntity<Milestone> updateMilestone(@PathVariable int id, @RequestBody Milestone milestone) {
        Optional<Milestone> updatedMilestone = service.updateMilestone(id, milestone);

        return updatedMilestone
                .map(ResponseEntity::ok) // 200 OK with updated object
                .orElseGet(() -> ResponseEntity.notFound().build()); // 404 if ID doesn't exist
    }

    @DeleteMapping("/milestones/{id}")
    public ResponseEntity<Void> deleteMilestone(@PathVariable int id) {
        service.deleteMilestone(id);
        return ResponseEntity.noContent().build(); // Returns 204 No Content on success
    }


}
