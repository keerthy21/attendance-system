package com._axis.server.configuration;


import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;



@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http    .cors().and()
                .csrf().disable()
                .authorizeRequests()
                .antMatchers("/api/login").permitAll()  // Open login and API
                .anyRequest().authenticated()  // Secure other endpoints
                .and()
                .formLogin()
                .loginPage("/api/login")  // Customize login page
                .permitAll()
                .and()
                .httpBasic();  // For basic authentication (optional, depends on your setup)
    }

}
