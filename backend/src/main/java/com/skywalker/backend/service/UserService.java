package com.skywalker.backend.service;

import com.skywalker.backend.dto.LoginRequest;
import com.skywalker.backend.dto.Response;
import com.skywalker.backend.dto.UserDTO;
import com.skywalker.backend.exception.OurException;
import com.skywalker.backend.model.User;
import com.skywalker.backend.repository.UserRepository;
import com.skywalker.backend.security.JWTUtils;
import com.skywalker.backend.security.Utils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JWTUtils jwtUtils;
    private final AuthenticationManager authenticationManager;

    public Response register(User user) {
        Response response = new Response();
        try {
            if (userRepository.existsByEmail(user.getEmail())) {
                throw new OurException(user.getEmail() + " already exists");
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
        } catch (Exception e) {
            response.setSuccess(false);
            response.setMessage("Error during registration: " + e.getMessage());
        }
        return response;
    }

    public Response login(LoginRequest loginRequest) {
        Response response = new Response();
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getEmail(),
                            loginRequest.getPassword()
                    )
            );

            User user = userRepository.findByEmail(loginRequest.getEmail())
                    .orElseThrow(() -> new OurException("User Not Found"));

            // Create UserDetails for JWT
            UserDetails userDetails = org.springframework.security.core.userdetails.User.builder()
                    .username(user.getEmail())
                    .password(user.getPassword())
                    .roles("USER")
                    .build();

            String token = jwtUtils.generateToken(userDetails);

            response.setSuccess(true);
            response.setMessage("Login successful");
            response.setToken(token);
            response.setTokenType("Bearer");
            response.setExpiresIn(8640000L);
            response.setUser(Utils.mapUserEntityToUserDTO(user));

        } catch (OurException e) {
            response.setSuccess(false);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setSuccess(false);
            response.setMessage("Error during login: " + e.getMessage());
        }

        return response;
    }
}
