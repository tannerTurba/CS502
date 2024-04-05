import { Injectable } from '@angular/core';
import { User } from './user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentUser: User | null = null;

  public isNavigated: boolean = this.router.navigated;

  constructor(private router: Router) { }



  // setCurrentUser(user: User): void {
  //   this.currentUser = user;
  // }

  // getCurrentUser(): User | null {
  //   return this.currentUser;
  // }
}
