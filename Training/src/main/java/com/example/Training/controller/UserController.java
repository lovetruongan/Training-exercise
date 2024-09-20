package com.example.Training.controller;

import com.example.Training.dto.request.UserCreateRequest;
import com.example.Training.dto.response.UserResponse;
import com.example.Training.service.UserService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping()
    ResponseEntity<List<UserResponse>> getUsers(@Param("sortBy") String sortBy) {
        return ResponseEntity.ok(userService.getUsers(sortBy));
    }

    @GetMapping("/{userId}")
    ResponseEntity<UserResponse> getUser(@PathVariable("userId") String userId) {
        return ResponseEntity.ok(userService.getUser(userId));
    }

    @PostMapping
    ResponseEntity<UserResponse> createUser(@RequestBody @Valid UserCreateRequest request) {
        return ResponseEntity.ok(userService.createUser(request));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("delete/{userId}")
    ResponseEntity<Void> deleteUser(@PathVariable String userId) {
        userService.deleteUser(userId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
