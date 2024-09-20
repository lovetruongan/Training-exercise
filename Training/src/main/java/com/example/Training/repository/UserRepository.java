package com.example.Training.repository;

import com.example.Training.entity.QUser;
import com.example.Training.entity.User;


import com.querydsl.core.types.dsl.StringExpression;
import com.querydsl.core.types.dsl.StringPath;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.querydsl.binding.QuerydslBinderCustomizer;
import org.springframework.data.querydsl.binding.QuerydslBindings;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface UserRepository extends JpaRepository<User, Integer>, QuerydslPredicateExecutor<User>, QuerydslBinderCustomizer<QUser> {

    @Override
    default void customize(QuerydslBindings bindings, QUser user) {
        bindings.bind(user.username).first(StringExpression::containsIgnoreCase);
    }

    @Query("SELECT u FROM User u ")
    List<User> findAllUser();

    @Query("SELECT u FROM User u WHERE u.user_id =:i")
    Optional<User> findUserById(@Param("i") String id);

    Optional<User> findByUsername(String username);


    boolean existsByUsername(String username);
}
