package com.turba.springrolls.springrolls.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.turba.springrolls.springrolls.models.Ingredient;

public interface IngredientRepository extends MongoRepository<Ingredient, String> {

}
