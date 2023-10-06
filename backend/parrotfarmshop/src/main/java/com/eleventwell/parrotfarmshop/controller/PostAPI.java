package com.eleventwell.parrotfarmshop.controller;

import com.eleventwell.parrotfarmshop.dto.PostDTO;
import com.eleventwell.parrotfarmshop.output.ListOutput;
import com.eleventwell.parrotfarmshop.service.IGenericService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/post")
public class PostAPI {

    @Autowired
    IGenericService postService;

    @GetMapping(value="")
    public ListOutput showPosts() {
        ListOutput result = new ListOutput();
        result.setListResult(postService.findAll());
        return  result;
    }

    @PostMapping(value="")
    public PostDTO createPost(@RequestBody PostDTO model){
        return (PostDTO) postService.save(model);
    }

    @PutMapping(value="{id}")
    public PostDTO updatePost(@RequestBody PostDTO model,@PathVariable("id") long id){
        model.setId(id);
        return (PostDTO) postService.save(model);
    }

//    @DeleteMapping(value = "")
//    public void deletePost(@RequestBody long[] ids){
//        postService.delete(ids);
//    }
    @DeleteMapping(value = "{id}")
    public void changeStatus(@RequestBody @PathVariable("id") Long id){
        postService.changeStatus(id);
    }
}


