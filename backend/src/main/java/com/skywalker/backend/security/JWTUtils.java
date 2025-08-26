package com.skywalker.backend.security;

import com.skywalker.backend.model.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.function.Function;

@Service
public class JWTUtils {

    private static final long EXPIRATION_TIME = 1000 * 60 * 24 * 100; // 100 days
    private SecretKey Key;

    //Injecting from env file
    @Value("${jwt.secret}")
    private String secretString;

    //Executes only after Injecting secretString
    @PostConstruct
    public void init() {

        //Converts the Base64-encoded string into a byte[] array
        byte[] keyBytes = Decoders.BASE64.decode(secretString);

        //Generates a secure HMAC SHA-based key for signing JWTs.
        this.Key = Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateToken(User userDetails){
        return Jwts.builder()
                .subject(userDetails.getUsername())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(Key)
                .compact();
    }

    public String extractUserName(String token){
        return extractClaims(token, Claims::getSubject);
    }

    private <T> T extractClaims(String token, Function<Claims,T> claimsTFunction){
        return claimsTFunction.apply(Jwts.parser()
                .verifyWith(Key)
                .build()
                .parseSignedClaims(token)
                .getPayload());
    }

    public boolean isValidToken(String token,UserDetails userDetails){
        final String username =extractUserName(token);
        return (username.equals(userDetails.getUsername()) && !isValidExpired(token));
    }

    private boolean isValidExpired(String token) {
        return extractClaims(token,Claims::getExpiration).before(new Date());
    }
}
