package com.skywalker.backend.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.function.Function;

@Service
@Slf4j
public class JWTUtils {

    private static final long EXPIRATION_TIME = 1000L * 60 * 60 * 24 ; // 24 hr
    private SecretKey key;

    @Value("${jwt.secret}")
    private String secretString;

    @PostConstruct
    public void init() {
        byte[] keyBytes = Decoders.BASE64.decode(secretString);
        this.key = Keys.hmacShaKeyFor(keyBytes);
        log.info("JWT Secret Key Initialized");
    }

    public String generateToken(UserDetails userDetails) {
        return Jwts.builder()
                .subject(userDetails.getUsername())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(key)
                .compact();
    }

    public String extractUserName(String token) {
        return extractClaims(token, Claims::getSubject);
    }

    public boolean isValidToken(String token, UserDetails userDetails) {
        String username = extractUserName(token);
        return username != null && username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        Date expiration = extractClaims(token, Claims::getExpiration);
        return expiration != null && expiration.before(new Date());
    }

    private <T> T extractClaims(String token, Function<Claims, T> claimsResolver) {
        try {
            return claimsResolver.apply(
                    Jwts.parser()
                            .verifyWith(key)
                            .build()
                            .parseSignedClaims(token)
                            .getPayload()
            );
        } catch (Exception e) {
            log.error("Invalid JWT Token: {}", e.getMessage());
            return null;
        }
    }
}
