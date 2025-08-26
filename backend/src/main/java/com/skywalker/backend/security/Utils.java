package com.skywalker.backend.security;

import com.skywalker.backend.dto.MilestoneDTO;
import com.skywalker.backend.dto.UserDTO;
import com.skywalker.backend.model.Milestone;
import com.skywalker.backend.model.User;

public class Utils {

    public static UserDTO mapUserEntityToUserDTO(User user) {
        UserDTO userDTO = new UserDTO();

        userDTO.setId(user.getId());;
        userDTO.setFirstName(user.getFirstName());
        userDTO.setLastName(user.getLastName());
        userDTO.setEmail(user.getEmail());
        
        return userDTO;
    }

    public static MilestoneDTO mapMilestoneToMilestoneDTO(Milestone milestone) {
        MilestoneDTO milestoneDTO = new MilestoneDTO();

        milestoneDTO.setId(milestone.getId());
        milestoneDTO.setTitle(milestone.getTitle());
        milestoneDTO.setDescription(milestone.getDescription());
        milestoneDTO.setCompleted(milestone.isCompleted());
        milestoneDTO.setAchieveDate(milestone.getAchieveDate());
        milestoneDTO.setCreatedDate(milestone.getCreatedDate());
        milestoneDTO.setCompletedDate(milestone.getCompletedDate());
        milestoneDTO.setUserId(milestone.getUser().getId());

        return milestoneDTO;
    }
}
