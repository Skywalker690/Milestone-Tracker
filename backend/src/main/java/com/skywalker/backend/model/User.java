package com.skywalker.backend.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;

@Data
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate createdDate;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Milestone> milestones;

    @PrePersist
    protected void onCreate() {
        createdDate = LocalDate.now();
    }



}
