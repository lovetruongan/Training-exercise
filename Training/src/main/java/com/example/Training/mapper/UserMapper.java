package com.example.Training.mapper;

import com.example.Training.dto.request.UserCreateRequest;
import com.example.Training.dto.response.UserResponse;
import com.example.Training.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserResponse toUserResponse(User user);

    @Mapping(target = "user_id", ignore = true)
    @Mapping(target = "role", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    User toUser(UserCreateRequest userCreateRequest);


}
