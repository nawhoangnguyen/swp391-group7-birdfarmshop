package com.eleventwell.parrotfarmshop.controller;


import com.eleventwell.parrotfarmshop.dto.UserDTO;
import com.eleventwell.parrotfarmshop.output.ListOutput;
import com.eleventwell.parrotfarmshop.service.IGenericService;
import com.eleventwell.parrotfarmshop.service.impl.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/user")
public class UserController {
    @Autowired
    IGenericService<UserDTO> userService;

    @Autowired
    UserService userService1;

    @GetMapping(value = "get-user-by-email/{email}")
    public UserDTO getUserByEmail(@PathVariable("email") String email) {
        if (userService1.findByEmail(email) != null) return userService1.findByEmail(email);
        return null;
    }

    @GetMapping(value = "")
    public List<UserDTO> showUsers() {
        List<UserDTO> results = userService.findAll();

        return results;
    }

    @PostMapping(value = "")
    public UserDTO createUser(@RequestBody UserDTO model) {
        return userService.save(model);
    }

    @PutMapping(value = "{id}")
    public UserDTO updateUser(@RequestBody UserDTO model, @PathVariable("id") Long id) {
        model.setId(id);

        return  userService.save(model);
    }

    @DeleteMapping(value = "{id}")
    public void changeStatus(@RequestBody @PathVariable("id") Long id){
        userService.changeStatus(id);
    }
}