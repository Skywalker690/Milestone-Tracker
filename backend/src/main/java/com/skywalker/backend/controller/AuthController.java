package com.skywalker.backend.controller;

import com.skywalker.backend.dto.LoginRequest;
import com.skywalker.backend.dto.Response;
import com.skywalker.backend.model.User;
import com.skywalker.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    @PostMapping("/signup")
    public Response register(@RequestBody User user) {
        return userService.register(user);
    }


}
