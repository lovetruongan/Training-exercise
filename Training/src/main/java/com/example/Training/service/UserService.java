package com.example.Training.service;

import com.example.Training.dto.request.UserCreateRequest;
import com.example.Training.dto.response.UserResponse;
import com.example.Training.entity.User;
import com.example.Training.exception.CustomException;
import com.example.Training.exception.ErrorCode;
import com.example.Training.repository.UserRepository;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Builder
@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@Slf4j
public class UserService {
    @Autowired
    UserRepository userRepository;

    public List<UserResponse> getUsers() {
        return userRepository.findAll().stream()
                .map(user -> UserResponse.builder()
                        .user_id(user.getUser_id())
                        .username(user.getUsername())
                        .password(user.getPassword())
                        .role(user.getRole())
                        .birth(user.getBirth())
                        .createdAt(user.getCreatedAt())
                        .build())
                .toList();
    }

    public UserResponse getUser(String userId) {
        User user = userRepository.findById(Integer.valueOf(userId))
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_EXISTED));
        return UserResponse.builder()
                .user_id(user.getUser_id())
                .username(user.getUsername())
                .password(user.getPassword())
                .role(user.getRole())
                .birth(user.getBirth())
                .createdAt(user.getCreatedAt())
                .build();
    }

    public UserResponse createUser(UserCreateRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new CustomException(ErrorCode.USER_EXISTED);
        }
        User user = User.builder()
                .username(request.getUsername())
                .password(request.getPassword())
                .birth(request.getBirth())
                .role("USER")
                .build();
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return UserResponse.builder()
                .user_id(userRepository.save(user).getUser_id())
                .username(user.getUsername())
                .password(user.getPassword())
                .role(user.getRole())
                .birth(user.getBirth())
                .createdAt(user.getCreatedAt())
                .build();
    }
}
