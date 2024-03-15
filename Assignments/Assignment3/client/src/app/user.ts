import { Defaults } from "./defaults";

export interface User {
    _id: string;
    email: string;
    password: string;
    defaults: Defaults;
}
