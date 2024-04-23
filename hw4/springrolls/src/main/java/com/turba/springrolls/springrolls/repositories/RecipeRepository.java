package com.turba.springrolls.springrolls.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.turba.springrolls.springrolls.models.Recipe;

public interface RecipeRepository extends MongoRepository<Recipe, String> {

}
