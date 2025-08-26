package com.skywalker.backend.service;

import com.skywalker.backend.dto.Response;
import com.skywalker.backend.dto.UserDTO;
import com.skywalker.backend.exception.OurException;
import com.skywalker.backend.model.User;
import com.skywalker.backend.repository.UserRepository;
import com.skywalker.backend.security.JWTUtils;
import com.skywalker.backend.security.Utils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JWTUtils jwtUtils;
    private final AuthenticationManager authenticationManager;


    public Response register(User user){
        Response response = new Response();
        try {
            if (userRepository.existsByEmail(user.getEmail())) {
                throw new OurException(user.getEmail() + "already exist");
            }
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            User savedUser = userRepository.save(user);
            UserDTO userDTO = Utils.mapUserEntityToUserDTO(savedUser);
            response.setSuccess(true);
            response.setMessage("User registered successfully");
            response.setUser(userDTO);
        } catch (OurException e) {
            response.setSuccess(false);
            response.setMessage(e.getMessage());
        }
        catch (Exception e) {
            response.setSuccess(false);
            response.setMessage("Error Occurred During User Registration "+e.getMessage());
        }

        return response;
    }

}
