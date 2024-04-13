import { Food } from "./food";
import { Measure } from "./measure";

export interface FoodHint {
    food: Food,
    measures: [Measure]
}
