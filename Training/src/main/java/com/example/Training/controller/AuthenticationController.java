package com.example.Training.controller;

import com.example.Training.dto.request.AuthenticationRequest;
import com.example.Training.dto.request.IntrospectRequest;
import com.example.Training.dto.request.LogoutRequest;
import com.example.Training.dto.response.AuthenticationResponse;
import com.example.Training.dto.response.IntrospectResponse;
import com.example.Training.service.AuthenticationService;
import com.nimbusds.jose.JOSEException;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;

@RestController
@RequestMapping("/auth")
@CrossOrigin
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationController {
    AuthenticationService authenticationService;

    @PostMapping("/login")
//    ApiResponse<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
//        var result = authenticationService.Authenticate(request);
//        return ApiResponse.<AuthenticationResponse>builder()
//                .result(result)
//                .message("Success")
//                .build();
//    }
    ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
        var result = authenticationService.Authenticate(request);
        return ResponseEntity.ok().body(result);
    }

    @PostMapping("/introspect")
    ResponseEntity<IntrospectResponse> introspect(@RequestBody IntrospectRequest request)
            throws ParseException, JOSEException {
        var result = authenticationService.introspect(request);
        return ResponseEntity.ok().body(result);
    }

    @PostMapping("/logout")
    ResponseEntity<Void> logout(@RequestBody LogoutRequest request)
            throws ParseException, JOSEException {
        authenticationService.logout(request);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/outbound/authentication")
    ResponseEntity<AuthenticationResponse> outboundAuthenticate(
            @RequestParam("code") String code
    ) {
        var result = authenticationService.outboundAuthenticate(code);
        return ResponseEntity.ok().body(result);
    }

}
