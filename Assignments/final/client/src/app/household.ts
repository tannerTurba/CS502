import { User } from "./user";

export interface Household {
    _id: string;
    members: [User];
    foodIds: [string];
}
