package com.example.Training.mapper;


import com.example.Training.entity.User;
import com.example.openapi.model.UserCreateRequest;
import com.example.openapi.model.UserResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(target = "userId", source = "user.user_id")
    UserResponse toUserResponse(User user);

    @Mapping(target = "user_id", ignore = true)
    @Mapping(target = "role", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    User toUser(UserCreateRequest userCreateRequest);


}
