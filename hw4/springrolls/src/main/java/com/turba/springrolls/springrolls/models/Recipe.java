package com.turba.springrolls.springrolls.models;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("recipe")
public class Recipe {
    
    @Id
    private String id;
    private String name;
    private List<Ingredient> ingredients;

    public Recipe() {

    }

    public Recipe(String name) {
        this.name = name;
    }

    public Recipe(String id, String name, List<Ingredient> ingredients) {
        super();
        this.id = id;
        this.name = name;
        this.ingredients = ingredients;
    }

    public String toString() {
        String s = String.format("Id: %s\nName: %s\n", id, name);
        for (Ingredient i : ingredients) {
            s += "    " + i.toString();
            s += "\n-------------\n";
        }
        return s;
    }

    /**
     * @return String return the id
     */
    public String getId() {
        return id;
    }

    /**
     * @param id the id to set
     */
    public void setId(String id) {
        this.id = id;
    }

    /**
     * @return String return the name
     */
    public String getName() {
        return name;
    }

    /**
     * @param name the name to set
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * @return List<Ingredient> return the ingredients
     */
    public List<Ingredient> getIngredients() {
        return ingredients;
    }

    /**
     * @param ingredients the ingredients to set
     */
    public void setIngredients(List<Ingredient> ingredients) {
        this.ingredients = ingredients;
    }

}
