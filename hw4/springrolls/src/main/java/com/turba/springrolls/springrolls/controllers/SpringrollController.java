package com.turba.springrolls.springrolls.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.turba.springrolls.springrolls.models.Ingredient;
import com.turba.springrolls.springrolls.models.Recipe;
import com.turba.springrolls.springrolls.services.IngredientService;
import com.turba.springrolls.springrolls.services.RecipeService;


@Controller
public class SpringrollController {
    @Autowired
    private RecipeService recipeService;
    @Autowired
    private IngredientService ingredientService;

    // public SpringrollController(RecipeService recipeService, IngredientService ingredientService) {
    //     this.recipeService = recipeService;
    //     this.ingredientService = ingredientService;
    // }

    /**
     * Deletes the specified ingredient from and shows the updated ingredient list on the ingredients page.
     * @param model
     * @param rid
     * @param iid
     * @return
     */
    @PostMapping("/recipes/{rid}/{iid}/delete")
    public String deleteRecipeDetail(Model model, @PathVariable String rid, @PathVariable String iid) {
        ingredientService.deleteIngredient(iid);
        List<Ingredient> ingredients = recipeService.deleteIngredient(rid, iid);
        Recipe recipe = recipeService.findRecipeById(rid);
        model.addAttribute("recipe", recipe);
        model.addAttribute("ingredients", ingredients);
        return "ingredients";
    }

    /**
     * Deletes the specified recipe from the db and displays the updated recipes page.
     * @param model
     * @param rid
     * @return
     */
    @PostMapping("/recipes/{rid}/delete")
    public String deleteRecipe(Model model, @PathVariable String rid) {
        Recipe recipe = recipeService.findRecipeById(rid);
        recipeService.deleteRecipe(recipe);
        List<Recipe> recipes = recipeService.getAllRecipes();
        model.addAttribute("recipes", recipes);
        return "recipes";
    }

    /**
     * Gets the ingredients for the specified recipe and displays it on the ingredient page.
     * @param model
     * @param rid
     * @return
     */
    @GetMapping("/recipes/{rid}")
    public String getRecipeDetails(Model model, @PathVariable String rid) {
        Recipe recipe = recipeService.findRecipeById(rid);
        List<Ingredient> ingredients = recipe.getIngredients();
        model.addAttribute("recipe", recipe);
        model.addAttribute("ingredients", ingredients);
        return "ingredients";
    }

    /**
     * Creates an ingredient in the database and displays it on the ingredient page.
     * @param model
     * @param id
     * @param description
     * @param amount
     * @param units
     * @return
     */
    @PostMapping("/ingredients")
    public String addIngredient(Model model, @RequestParam("id") String id, @RequestParam("desc") String description, @RequestParam("amount") int amount, @RequestParam("units") String units) {
        Ingredient ingredient = ingredientService.saveIngredient(new Ingredient(null, description, amount, units));
        List<Ingredient> ingredients = recipeService.addIngredient(id, ingredient);
        Recipe recipe = recipeService.findRecipeById(id);
        model.addAttribute("recipe", recipe);
        model.addAttribute("ingredients", ingredients);
        return "ingredients";
    }

    /**
     * Displays all recipes on the recipe page.
     * @param model
     * @return
     */
    @GetMapping({"/", "/recipes"})
    public String getMenuPage(Model model) {
        List<Recipe> recipes = recipeService.getAllRecipes();
        model.addAttribute("recipes", recipes);
        return "recipes";
    }

    /**
     * Creates a Recipe in the database and redirects to the ingredients detail page.
     * @param model
     * @param recipeName
     * @return
     */
    @PostMapping("/recipes")
    public String createRecipe(Model model, @RequestParam("name") String recipeName) {
        Recipe recipe = recipeService.saveRecipe(new Recipe(recipeName));
        model.addAttribute("recipe", recipe);
        return "ingredients";
    }
}
