import { Food } from "./food";

export interface KeywordResult {
    text: string,
    parsed: [],
    hints: [Food],
    _links: {
        next: {
            title: string,
            href: string
        }
    }
}
