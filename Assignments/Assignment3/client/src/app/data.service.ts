import { Injectable } from '@angular/core';
import { Metadata } from './metadata';
import { Game } from './game';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  /**
   * Gets the sessionID of the current session.
   * @returns The sessionID of the current session.
   */
  async getSID(): Promise<string> {
    return fetch('http://localhost:3000/api/v1/sid')
      .then(response => {
        if (!response.ok) {
          console.log('Failed to get SID');
        }
        return response.json();
      })
      .then(data => {
        return data.sid;
      })
      .catch(error => {
        console.error('Error fetching /api/v1/sid: ', error);
      });
  }
  
  /**
   * Gets the metadate for the web app.
   * @returns The metadate of the web app.
   */
  async getMetadata(): Promise<Metadata> {
    return fetch('http://localhost:3000/api/v1/meta')
      .then(response => {
        if (!response.ok) {
          console.log('Failed to get Metadata!');
        }
        return response.json();
      })
      .then(data => {
        return JSON.parse(data);
      })
      .catch(error => {
        console.error('Error fetching /api/v1/meta: ', error);
      });
  }
  
  /**
   * Gets all the Game objects associated with the current sessionID.
   * @returns A collection of Game objects.
   */
  async getAllGames(): Promise<Game[]> {
    const sessionID = await this.getSID();
    let games = await fetch(`http://localhost:3000/api/v1/${sessionID}/games`)
      .then(response => {
        if (!response.ok) {
          console.log(`Failed to get games for session ${sessionID}!`);
        }
        return response.json();
      })
      .then(data => {

        return JSON.parse(data);
      })
      .catch(error => {
        console.error('Error fetching /api/v1/:sid/games: ', error);
      });
      return games;
  }
  
  /**
   * Creates a Game object that will be associated with the current sessionID.
   * @returns A new Game object.
   */
  async createGame(level: string, font: string, wordColor: string, guessColor: string, foreColor: string): Promise<string> {
    // Get game config.
    const sessionID = await this.getSID();
    const colorObj = {
      guessColor: guessColor,
      foreColor: foreColor,
      wordColor: wordColor
    };
  
    // Use a POST call to create the Game on the backend.
    let game = await fetch (`http://localhost:3000/api/v1/${sessionID}/games?level=${level}`, {
      method: 'POST',
      headers: {
        'X-font' : font, 
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(colorObj)
    })
      .then(response => {
        if (!response.ok) {
          console.log(`Failed to create a game for session '${sessionID}'.`);
        }
        return response.json();
      })
      .then(data => {
        return JSON.parse(data);
      })
      .catch(error => {
        console.error(`Error fetching /api/v1/:sessionID/games: `, error);
      })
      return game;
  }
  
  /**
   * Gets a Game object that is associated with the specified gameID.
   * @param {string} gameID The gameID of the desired game.
   * @returns A Game object
   */
  async getGame(gameID: string): Promise<string> {
    const sessionID = await this.getSID();
    return fetch(`http://localhost:3000/api/v1/${sessionID}/games/${gameID}`)
      .then(response => {
        if (!response.ok) {
          console.log(`Failed to get game '${gameID}' for session '${sessionID}'.`);
        }
        return response.json();
      })
      .then(data => {
        return JSON.parse(data);
      })
      .catch(error => {
        console.error('Error fetching /api/v1/:sessionID/games/:gameId: ', error);
      });
  } 
  
  /**
   * Adds a guess to the specified game and gets the updated game instance.
   * @param {string} gameID The gameID to add a guess to.
   * @param {string} letter The letter that was guessed.
   * @returns A Game object of the updated game.
   */
  async makeGuess(gameID: string, letter: string): Promise<string> {
    const sessionID = await this.getSID();
    return fetch(`http://localhost:3000/api/v1/${sessionID}/games/${gameID}/guesses?guess=${letter}`, {
      method: 'POST'
    })
      .then(response => {
        if (!response.ok) {
          console.log(`Failed to make a guess in game '${gameID}' for '${sessionID}'.`);
        }
        return response.json();
      })
      .then(data => {
        return JSON.parse(data);
      })
      .catch(error => {
        console.error(`Error fetching /api/v1/sessionID/games/gameID: `, error);
      });
  }
}
