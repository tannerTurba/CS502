import { Injectable } from '@angular/core';
import { Metadata } from './metadata';
import { Game } from './game';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Font } from './font';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  apiVersion: string = 'api/v2';
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<User | string> {
    const userCredentials = {
      email: email,
      password: password
    };
    return this.http.post<User>(`${this.apiVersion}/login`, userCredentials);
  }

  logout(): Observable<string> {
    return this.http.post<string>(`${this.apiVersion}/logout`, {});
  }

  /**
   * Gets the metadate for the web app.
   * @returns The metadate of the web app.
   */
  getMetadata(): Observable<Metadata> {
    return this.http.get<Metadata>(`${this.apiVersion}/meta`);
  }

  /**
   * Gets all the available Fonts.
   * @returns A collection of Font objects.
   */
  getFonts(): Observable<[Font]> {
    return this.http.get<[Font]>(`${this.apiVersion}/fonts`);
  }
  
  /**
   * Gets all the Game objects associated with the current sessionID.
   * @returns A collection of Game objects.
   */
  getAllGames(userId: string): Observable<[Game]> {
    return this.http.get<[Game]>(`${this.apiVersion}/users/${userId}/games`);
  }

  /**
   * Retrieves a Game.
   * @param userId The user who the game belongs to.
   * @param gameId The game to retrieve.
   * @returns The specified game.
   */
  getGame(userId: string, gameId: string): Observable<Game> {
    return this.http.get<Game>(`${this.apiVersion}/users/${userId}/games/${gameId}`);
  }
  
  /**
   * Creates a Game object that will be associated with the current sessionID.
   * @returns A new Game object.
   */
  createGame(userId: string, level: string, font: string, word: string, guess: string, fore: string): Observable<Game> {
    const colorObj = {
      guess: guess,
      fore: fore,
      word: word
    };

    const headers = new HttpHeaders()
      .set('X-font', font)
      .set('Content-Type', 'application/json');

    return this.http.post<Game>(`${this.apiVersion}/users/${userId}/games?level=${level}`, colorObj, { headers });
  }

  /**
   * Adds a guess to the specified game and gets the updated game instance.
   * @param userId The user who the game belongs to.
   * @param gameId The gameId to add a guess to.
   * @param guess The letter that was guessed.
   * @returns A Game object of the updated game.
   */
  makeGuess(userId: string, gameId: string, guess: string): Observable<Game> {
    return this.http.post<Game>(`${this.apiVersion}/users/${userId}/games/${gameId}/guesses?guess=${guess}`, {});
  }
}
