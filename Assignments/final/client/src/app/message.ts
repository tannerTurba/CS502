import { Food } from "./food";

export interface Message {
    _id: string,
    to: string,
    from: string, 
    food: Food,
    quantity: number, 
    status: string, 
    dateSent: Date
}
