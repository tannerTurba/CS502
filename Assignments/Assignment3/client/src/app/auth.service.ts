import { Injectable } from '@angular/core';
import { User } from './user';
import { Router } from '@angular/router';
import { getAuthUser } from './globals';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentUser: User | null = getAuthUser();

  public isNavigated: boolean = this.router.navigated;

  constructor(private router: Router) { }
}
