package com.example.backend;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;


@Entity
@Data
public class Item {

    @Id
    private Long id;
    private String name;
}
