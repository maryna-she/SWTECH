package com.shopproject.user;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/auth")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Einfacher User anlegen, z.B. mit Postman
    @PostMapping("/add")
    public String addNewUser(@RequestParam String name,
                             @RequestParam String email,
                             @RequestParam String password) {

        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPassword(password); // später mit BCrypt sichern

        userRepository.save(user);
        return "Saved";
    }


    // Login für das Frontend
    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) {
        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED));

        if (!user.getPassword().equals(request.password())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        }

        return new AuthResponse(
                "dummy-token",
                user.getEmail(),
                user.getName(),
                "CUSTOMER"
        );
    }

    @GetMapping("/all")
    public Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }

    public record LoginRequest(String email, String password) {
    }

    public record AuthResponse(String token, String email, String name, String role) {
    }
}