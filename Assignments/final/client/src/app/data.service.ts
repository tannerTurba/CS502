import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user';
import { Food } from './food';
import { Message } from './message';
import { Household } from './household';

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

  getUserInfo(uid: String): Observable<User> {
    return this.http.get<User>(`${this.apiVersion}/users/${uid}`);
  }

  getIngredients(uid: string): Observable<[Food]> {
    return this.http.get<[Food]>(`${this.apiVersion}/users/${uid}/ingredients`);
  }

  getUserIngredient(uid: string, fid: string): Observable<Food> {
    return this.http.get<Food>(`${this.apiVersion}/users/${uid}/ingredients/${fid}`);
  }

  getIngredient(uid: string, hid: string, fid: string): Observable<[Food]> {
    return this.http.get<[Food]>(`${this.apiVersion}/users/${uid}/households/${hid}/ingredients/${fid}`);
  }

  setQuantity(uid: string, fid: string, quantity: number): Observable<Food> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put<Food>(`${this.apiVersion}/users/${uid}/ingredients/${fid}`, { quantity : quantity }, { headers: headers });
  }

  addIngredient(uid: string, food: Food): Observable<Food> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<Food>(`${this.apiVersion}/users/${uid}/ingredients`, food, { headers: headers });
  }

  getMessageDirectory(uid: string): Observable<[User]> {
    return this.http.get<[User]>(`${this.apiVersion}/users/${uid}/messages`);
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
}
