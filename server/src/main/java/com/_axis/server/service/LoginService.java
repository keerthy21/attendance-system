package com._axis.server.service;

import com._axis.server.model.LoginRequest;
import com._axis.server.model.Response;
import com._axis.server.model.TokenResponse;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.security.Key;
import java.util.Date;
import java.util.List;

@Service
public class LoginService {
    private Key secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    private long expirationTime = 3600000L; // 1 hour expiration time

    public Response login(LoginRequest loginRequest) {
        Response res = new Response();
        TokenResponse tokenResponse = new TokenResponse();
        if(validateCredentials(loginRequest.getUsername(),loginRequest.getPassword())){
            String token = Jwts.builder()
                    .setSubject(loginRequest.getUsername())
                    .setIssuedAt(new Date())
                    .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
                    .signWith(SignatureAlgorithm.HS256, secretKey)
                    .compact();
            tokenResponse.setToken(token);
            res.setStatus(200);
            res.setMsg("Login Sucessfull");
            res.setObject(tokenResponse);

        }else{
            res.setStatus(401);
            res.setMsg("Invalid Username or password");
        }
        return res;

    }


    public List<LoginRequest> loadUsers() {
        List<LoginRequest> loginRequestList = null;

        try {
            Resource resource = new ClassPathResource("users.json");

            InputStream inputStream = resource.getInputStream();

            ObjectMapper objectMapper = new ObjectMapper();

            loginRequestList = objectMapper.readValue(inputStream, new TypeReference<List<LoginRequest>>() {
            });

        } catch (IOException e) {
            e.printStackTrace();
        }

        return loginRequestList;
    }

    private boolean validateCredentials(String username, String password) {
        try {
            List<LoginRequest> loginrequest = loadUsers();
            for (LoginRequest singleuser : loginrequest) {

                if (singleuser.getUsername().equals(username) && singleuser.getPassword().equals(password)) {
                    return true;
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }


}
