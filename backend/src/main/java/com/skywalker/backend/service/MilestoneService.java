package com.skywalker.backend.service;

import com.skywalker.backend.model.Milestone;
import com.skywalker.backend.repository.MilestoneRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MilestoneService {

    private final MilestoneRepository repository;


    public List<Milestone> getAllMilestones() {
        return repository.findAll();
    }

    public Optional<Milestone> getMilestoneById(int id) {
        return repository.findById(id);
    }


    public Milestone createMilestone(Milestone milestone) {
        return repository.save(milestone);
    }


    public void deleteMilestone(int id) {
        if (!repository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Milestone not found");
        }
        repository.deleteById(id);
    }


    public Optional<Milestone> updateMilestone(int id, Milestone milestone) {
        return repository.findById(id)
                .map(existingMilestone -> {
                    existingMilestone.setTitle(milestone.getTitle());
                    existingMilestone.setDescription(milestone.getDescription());
                    existingMilestone.setAchieveDate(milestone.getAchieveDate());
                    existingMilestone.setCompleted(milestone.isCompleted());
                    existingMilestone.setCompletedDate(milestone.getCompletedDate());
                    return repository.save(existingMilestone);
                });
    }


}
