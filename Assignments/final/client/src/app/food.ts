import { Nutrients } from "./nutrients";
import { ServingSize } from "./serving-size";

export interface Food {
    label : string,
    knownAs : string,
    nutrients : Nutrients,
    brand : string, 
    category : string, 
    categoryLabel : string, 
    foodContentsLabel : string,
    image : string, 
    servingSizes : [ServingSize],
    servingsPerContainer : number,
}
