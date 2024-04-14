import { Food } from "./food";
import { Measure } from "./measure";

export interface KeywordResult {
    text: string,
    parsed: [],
    hints: [{
        food: Food,
        measures: [Measure]
    }],
    _links: {
        next: {
            title: string,
            href: string
        }
    }
}
