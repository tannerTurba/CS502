package com.turba.springrolls.springrolls.services;
import org.springframework.stereotype.Service;

import com.turba.springrolls.springrolls.models.Ingredient;
import com.turba.springrolls.springrolls.repositories.IngredientRepository;

@Service
public class IngredientService {
    private final IngredientRepository ingredientRepository;

    public IngredientService(IngredientRepository ingredientRepository) {
        this.ingredientRepository = ingredientRepository;
    }

    public Ingredient saveIngredient(Ingredient ingredient) {
        return ingredientRepository.save(ingredient);
    }

    public void deleteIngredient(String ingredientId) {
        ingredientRepository.deleteById(ingredientId);
    }
}