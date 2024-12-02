package com.example.backend;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Item {

    @Id
    private Long id;
    private String name;

    // Getters and setters
}
