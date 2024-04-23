package com.turba.springrolls.springrolls;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.turba.springrolls.springrolls.repositories.IngredientRepository;
import com.turba.springrolls.springrolls.repositories.RecipeRepository;

@SpringBootApplication
public class SpringrollsApplication {

	@Autowired
	IngredientRepository ingredientRepo;
	@Autowired
	RecipeRepository recipeRepo;

	public static void main(String[] args) {
		SpringApplication.run(SpringrollsApplication.class, args);
	}

}
