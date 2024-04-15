import { User } from "./user";

export interface MessageDirectory {
    ownerId: string, 
    contacts: [User]
}
