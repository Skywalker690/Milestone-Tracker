package com.skywalker.backend.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;

@Data
@Entity
@Table(name = "milestones")
public class Milestone {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private boolean completed = false;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate achieveDate;

    @JsonFormat(pattern = "yyyy-MM-dd")
    @CreationTimestamp
    private LocalDate createdDate;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate completedDate=null;



    @PreUpdate
    protected void onUpdate() {
        if (completed && completedDate == null) {
            completedDate = LocalDate.now();
        }
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;

}
