package com.turba.springrolls.springrolls.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.turba.springrolls.springrolls.models.Ingredient;
import com.turba.springrolls.springrolls.models.Recipe;
import com.turba.springrolls.springrolls.repositories.RecipeRepository;

@Service
public class RecipeService {
    private final RecipeRepository recipeRepository;

    public RecipeService(RecipeRepository recipeRepository) {
        this.recipeRepository = recipeRepository;
    }

    public List<Ingredient> deleteIngredient(String recipeId, String ingredientId) {
        Recipe recipe = recipeRepository.findById(recipeId).orElse(null);
        if (recipe != null) {
            List<Ingredient> ingredients = recipe.getIngredients();
            ingredients.removeIf(x -> (x.getId().equals(ingredientId)));
            recipe.setIngredients(ingredients);
            recipeRepository.save(recipe);
            return ingredients;
        }
        return null;
    }

    public List<Ingredient> getAllIngredients(String recipeId) {
        Recipe recipe = recipeRepository.findById(recipeId).orElse(null);
        if (recipe != null) {
            return recipe.getIngredients();
        }
        return null;
    }

    public List<Ingredient> addIngredient(String recipeId, Ingredient ingredient) {
        Recipe recipe = recipeRepository.findById(recipeId).orElse(null);
        if (recipe != null) {
            List<Ingredient> ingrList;
            if (recipe.getIngredients() == null) {
                ingrList = new ArrayList<>();
            }
            else {
                ingrList = recipe.getIngredients();
            }
            ingrList.add(ingredient);
            recipe.setIngredients(ingrList);
            recipeRepository.save(recipe);
            return recipe.getIngredients();
        }
        return null;
    }

    public List<Recipe> getAllRecipes() {
        return recipeRepository.findAll();
    }

    public Recipe findRecipeById(String recipeId) {
        return recipeRepository.findById(recipeId).orElse(null);
    }

    public Recipe saveRecipe(Recipe recipe) {
        return recipeRepository.save(recipe);
    }

    public void deleteRecipe(Recipe recipe) {
        recipeRepository.delete(recipe);
    }
}
