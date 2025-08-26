package com.skywalker.backend.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Response {

    private Boolean success;
    private String message;
    private String token;
    private String tokenType;
    private Long expiresIn;

    private UserDTO user;
}
