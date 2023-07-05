package com.blackjack.controller;

import com.blackjack.model.User;
import com.blackjack.service.RegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class RegistrationController {

    @Autowired
    private RegistrationService service;

    @PostMapping("/registeruser")
    @CrossOrigin(origins = "http://localhost:4200")
    public User registerUser(@RequestBody User user) throws Exception {
        String tempEmailId = user.getEmailId();
        if(tempEmailId != null && "".equals(tempEmailId)) {
            User userObj = service.fetchUserByEmailId(tempEmailId);
            if (userObj != null) {
                throw new Exception("User with "+tempEmailId+" is already exist");
            }
        }
        User userObj = null;
        userObj = service.saveUser(user);
        return userObj;
    }

    @PostMapping("/login")
    @CrossOrigin(origins = "http://localhost:4200")
    public User loginUser(@RequestBody User user) throws Exception {
        String tempEmailId = user.getEmailId();
        String tempPass = user.getPassword();
        User userObj = null;

        if (tempEmailId != null && tempPass != null) {
            userObj = service.fetchUserByEmailIdAndPassword(tempEmailId, tempPass);
        }
        if (userObj == null) {
            throw new Exception("Bad credentials");
        }
        return userObj;
    }

    @PostMapping("/winner")
    @CrossOrigin(origins = "http://localhost:4200")
    public User setWinner(@RequestBody User user) throws Exception {
        String tempEmailId = user.getEmailId();
        User userObj = new User();

        if (tempEmailId != null) {
            service.setWinnerPoints(tempEmailId);
        }

        return userObj;
    }

    @PostMapping("/loser")
    @CrossOrigin(origins = "http://localhost:4200")
    public User setLoser(@RequestBody User user) throws Exception {
        String tempEmailId = user.getEmailId();
        User userObj = new User();

        if (tempEmailId != null) {
            service.setLoserPoints(tempEmailId);
        }

        return userObj;
    }

    @GetMapping("/ranking")
    @CrossOrigin(origins = "http://localhost:4200")
    public List<User> getUserList() {
        return service.getUserList();
    }
}
