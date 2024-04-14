import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user';
import { Food } from './food';

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

  getIngredients(uid: string): Observable<[Food]> {
    return this.http.get<[Food]>(`${this.apiVersion}/users/${uid}/ingredients`);
  }

  setQuantity(uid: string, fid: string, quantity: number): Observable<Food> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<Food>(`${this.apiVersion}/users/${uid}/ingredients/${fid}`, { quantity : quantity }, { headers: headers });
  }
}
