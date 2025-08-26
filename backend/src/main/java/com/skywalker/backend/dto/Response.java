package com.skywalker.backend.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Response {

    // Used for general HTTP-like status and success/error messages
    private Boolean success;   // changed to Boolean
    private String message;    // changed to singular to match JSON

    // Optional fields
    private String role;
    private String token;
    private String expirationTime;
    private String bookingConfirmationCode;

    // Nested object for user-related responses
    private Object user; // can be your UserDTO instead of Object
}
