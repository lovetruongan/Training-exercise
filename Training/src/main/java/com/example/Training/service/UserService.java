package com.example.Training.service;


import com.example.Training.entity.QUser;
import com.example.Training.entity.User;
import com.example.Training.exception.CustomException;
import com.example.Training.exception.ErrorCode;
import com.example.Training.mapper.UserMapper;
import com.example.Training.repository.UserRepository;
import com.example.openapi.model.UserCreateRequest;
import com.example.openapi.model.UserResponse;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
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
    UserMapper userMapper;

    @PersistenceContext
    EntityManager entityManager;

    public List<UserResponse> getUsers(String sortBy) {
        JPAQueryFactory queryFactory = new JPAQueryFactory(entityManager);
        QUser user = QUser.user;

        return queryFactory.selectFrom(user)
                .orderBy(sortBy.equals("username") ? user.username.asc() : user.user_id.asc())
                .fetch()
                .stream()
                .map(userMapper::toUserResponse)
                .toList();
    }

    public UserResponse getUser(String userID) {
        JPAQueryFactory queryFactory = new JPAQueryFactory(entityManager);
        QUser user = QUser.user;

        BooleanExpression idFilter = user.user_id.eq(Integer.parseInt(userID));
        return queryFactory.selectFrom(user)
                .where(idFilter)
                .fetch()
                .stream()
                .map(userMapper::toUserResponse)
                .findFirst()
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_EXISTED));
    }

    public UserResponse createUser(UserCreateRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new CustomException(ErrorCode.USER_EXISTED);
        }
        User user = userMapper.toUser(request);
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole("USER");

        return userMapper.toUserResponse(userRepository.save(user));
    }

    public void deleteUser(String userId) {
        User user = userRepository.findById(Integer.parseInt(userId))
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_EXISTED));
        userRepository.delete(user);
    }
}
