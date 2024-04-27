import { Injectable } from '@angular/core';
import { first, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from './user';
import { Food } from './food';
import { Message } from './message';
import { Household } from './household';
import { headers } from 'next/headers';
import { PantrySearchResult } from './pantry-search-result';
import { IngredientSearchResult } from './ingredient-search-result';
import { PantryCardOwner } from './pantry-card-owner';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  apiVersion: string = 'api/v1';
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<User | string> {
    const userCredentials = {
      username: username,
      password: password
    };
    return this.http.post<User>(`${this.apiVersion}/login`, userCredentials);
  }

  logout(): Observable<string> {
    return this.http.post<string>(`${this.apiVersion}/logout`, {});
  }

  signup(username: string, password: string, firstName: string, lastName: string): Observable<User | string> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<User | string>(`${this.apiVersion}/signup`, {
      username: username,
      password: password, 
      firstName: firstName,
      lastName: lastName
    }, {headers: headers});
  }

  modifyAccount(uid: string, firstName: string, lastName: string, password: string): Observable<User> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<User>(`${this.apiVersion}/users/${uid}`, {
      firstName: firstName,
      lastName: lastName,
      password: password
    }, 
    {headers: headers});
  }

  getUserInfo(uid: String): Observable<User> {
    return this.http.get<User>(`${this.apiVersion}/users/${uid}`);
  }

  getIngredients(uid: string, search: string, page: string): Observable<IngredientSearchResult> {
    return this.http.get<IngredientSearchResult>(`${this.apiVersion}/users/${uid}/ingredients`, {
      params: new HttpParams().set('search', search).set('page', page)
    });
  }

  getUserIngredient(uid: string, fid: string): Observable<Food> {
    return this.http.get<Food>(`${this.apiVersion}/users/${uid}/ingredients/${fid}`);
  }

  getIngredient(uid: string, hid: string, fid: string): Observable<[PantryCardOwner]> {
    return this.http.get<[PantryCardOwner]>(`${this.apiVersion}/users/${uid}/households/${hid}/ingredients/${fid}`);
  }

  setSharedIngredient(uid: string, hid: string, food: Food): Observable<Food> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<Food>(`${this.apiVersion}/users/${uid}/households/${hid}/ingredients/${food.foodId}`, { food: food }, { headers: headers });
  }

  setQuantity(uid: string, fid: string, quantity: number): Observable<Food> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put<Food>(`${this.apiVersion}/users/${uid}/ingredients/${fid}`, { quantity : quantity }, { headers: headers });
  }

  addIngredient(uid: string, food: Food): Observable<Food> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<Food>(`${this.apiVersion}/users/${uid}/ingredients`, food, { headers: headers });
  }

  getMessageDirectory(uid: string): Observable<[User] | string> {
    return this.http.get<[User] | string>(`${this.apiVersion}/users/${uid}/messages`);
  }

  getUserMessages(uid: string, contactId: string): Observable<[Message]> {
    return this.http.get<[Message]>(`${this.apiVersion}/users/${uid}/messages/${contactId}`);
  }

  updateMessage(uid: string, mid: string, status: string, quantity: number): Observable<Message> {
    return this.http.put<Message>(`${this.apiVersion}/users/${uid}/messages/${mid}`, { status: status, quantity: quantity });
  }

  transferIngredient(foodId: string, uid: string, to: string, quantity: number): Observable<Food> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<Food>(`${this.apiVersion}/users/${uid}/ingredients/${foodId}`, 
    {
      transferTo: to,
      quantity: quantity
    },
    {
      headers: headers
    });
  }

  getHousehold(uid: string, hid: string): Observable<Household> {
    return this.http.get<Household>(`${this.apiVersion}/users/${uid}/households/${hid}`);
  }

  getSharedFood(uid: string, hid: string, search: string, page: string): Observable<PantrySearchResult> {
    return this.http.get<PantrySearchResult>(`${this.apiVersion}/users/${uid}/households/${hid}/ingredients`, {
      params: new HttpParams().set('search', search).set('page', page)
    });
  }

  getPantryPage(url: string): Observable<PantrySearchResult> {
    return this.http.get<PantrySearchResult>(`${this.apiVersion}${url}`);
  }

  createMessage(uid: string, contactId: string, foodId: string, quantity: number): Observable<Message> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<Message>(`${this.apiVersion}/users/${uid}/contacts/${contactId}/messages`, { foodId: foodId, quantity: quantity },  { headers: headers } );
  }

  addMemberToHousehold(uid: string, hid: string, memberUsername: string): Observable<Household | string> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<Household | string>(`${this.apiVersion}/users/${uid}/households/${hid}/members`, {memberUsername: memberUsername}, {headers: headers});
  }

  removeMemberFromHousehold(uid: string, hid: string, mid: string): Observable<Household> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<Household>(`${this.apiVersion}/users/${uid}/households/${hid}/members/${mid}`, {}, {headers: headers});
  }

  reassignAdmin(uid: string, hid: string, mid: string): Observable<Household> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put<Household>(`${this.apiVersion}/users/${uid}/households/${hid}/members/${mid}`, {}, {headers: headers});
  }

  createHousehold(uid: string): Observable<Household> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<Household>(`${this.apiVersion}/users/${uid}/households`, {}, {headers: headers});
  }
}
