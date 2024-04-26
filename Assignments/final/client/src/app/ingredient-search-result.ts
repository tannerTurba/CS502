import { Food } from "./food";

export interface IngredientSearchResult {
    food: [Food],
    prev: string,
    next: string
}
