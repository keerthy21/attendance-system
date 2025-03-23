package com._axis.server.controller;

import com._axis.server.dto.LoginRequest;
import com._axis.server.dto.Response;
import com._axis.server.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class LoginController {


    @Autowired
    private LoginService loginService;

    @PutMapping("/login")
    public Response login(@RequestBody LoginRequest loginRequest) {
        return loginService.login(loginRequest);

    }


}
