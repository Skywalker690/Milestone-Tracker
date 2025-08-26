package com.skywalker.backend.dto;


import lombok.Data;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDate;

@Data
public class MilestoneDTO {

    private Long id;
    private String title;
    private String description;
    private boolean completed;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate achieveDate;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate createdDate;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate completedDate;

    private Long userId; // only expose the user ID, not full user
}
