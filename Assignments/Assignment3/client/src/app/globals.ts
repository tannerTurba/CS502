import { User } from "./user";

export let authUser: User | null = null;

export function setAuthUser(user: User | null) {
    authUser = user;
    console.log(user);
}

export function getAuthUser(): User | null {
    return authUser;
}