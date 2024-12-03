package com.example.backend;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

import java.io.Serializable;


@Entity
@Data
public class Item implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    private Long id;
    private String name;
}