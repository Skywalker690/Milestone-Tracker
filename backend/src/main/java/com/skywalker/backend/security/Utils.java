package com.skywalker.backend.security;


import com.skywalker.backend.dto.UserDTO;
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

}
