package com.example.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.redis.core.RedisTemplate;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ItemService {

    private static final String REDIS_KEY = "items";

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    public List<Item> findAll() {
        // Recuperar todos los elementos de Redis
        return redisTemplate.opsForHash().values(REDIS_KEY).stream()
                .map(obj -> (Item) obj)
                .collect(Collectors.toList());
    }

    public Item save(Item item) {
        // Generar un ID único si no existe
        if (item.getId() == null) {
            item.setId(System.currentTimeMillis()); // Simple ejemplo, mejor usar un generador de ID más robusto
        }
        // Guardar el objeto en Redis
        redisTemplate.opsForHash().put(REDIS_KEY, item.getId().toString(), item);
        return item;
    }

    public Item update(Long id, Item item) {
        // Verificar si existe en Redis
        if (redisTemplate.opsForHash().hasKey(REDIS_KEY, id.toString())) {
            item.setId(id);
            redisTemplate.opsForHash().put(REDIS_KEY, id.toString(), item);
            return item;
        }
        return null;
    }

    public void delete(Long id) {
        // Eliminar del hash en Redis
        redisTemplate.opsForHash().delete(REDIS_KEY, id.toString());
    }
}
