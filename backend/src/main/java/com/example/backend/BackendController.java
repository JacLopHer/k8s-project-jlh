package com.example.backend;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class BackendController {

    private List<String> items = new ArrayList<>();

    @PostMapping("/create")
    public String create(@RequestBody String item) {
        items.add(item);
        return "Item added";
    }

    @GetMapping("/read")
    public List<String> read() {
        return items;
    }

    @PutMapping("/update/{index}")
    public String update(@PathVariable int index, @RequestBody String item) {
        items.set(index, item);
        return "Item updated";
    }

    @DeleteMapping("/delete/{index}")
    public String delete(@PathVariable int index) {
        items.remove(index);
        return "Item deleted";
    }
}
