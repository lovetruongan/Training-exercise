package com.example.Training.repository;

import com.example.Training.entity.User;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    @Query("SELECT u FROM User u ")
    List<User> findAllUser();

    @Query("SELECT u FROM User u WHERE u.user_id =:i")
    Optional<User> findUserById(@Param("i") String id);

    Optional<User> findByUsername(String username);

//    default Optional<User> findUserById(String id) {
//        QUser qUser = QUser.user;
//        BooleanExpression predicate = qUser.user_id.eq(Integer.parseInt(id));
//        return findOne(predicate);
//    }

    boolean existsByUsername(String username);
}
