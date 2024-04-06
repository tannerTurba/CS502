import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { Game } from '../game';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {
  gameState: Game = {
    userId: "",
    colors: {
        guess: "",
        fore: "",
        word: ""
    },
    font: {
        category: "",
        family: "",
        rule: "",
        url: ""
    },
    guesses: "",
    level: {
        rounds: 0,
        minLength: 0,
        maxLenth: 0,
        name: ""
    },
    remaining: 0,
    status: "",
    target: "",
    timestamp: 0,
    timeToComplete: 0,
    _id: "",
    view: "",
    msg: ""
}
  userId: string;
  gameId: string;
  image: string = '';
  guessForm = this.formBuilder.group({
    guess: ''
  });
  gameIsOver: boolean = false;

  constructor(
    private data: DataService,
    private route: ActivatedRoute,
    private location: Location,
    private formBuilder: FormBuilder
  ) { 
    this.userId = this.route.snapshot.paramMap.get('uid')!;
    this.gameId = this.route.snapshot.paramMap.get('gid')!;
    this.data.getGame(this.userId, this.gameId).subscribe((game) => {
      this.gameState = game;
      this.updateView(this.gameState);
    });
  }

  updateView(game: Game): void {
    let imageContainer = document.getElementById('imageContainer');
    if (game.status === 'victory') { 
      this.image = 'winImage';
    }
    else if (game.status === 'loss') {
      this.image = 'loseImage';
    }
    this.gameIsOver = this.gameState.status != 'unfinished';
  }

  makeGuess(event: Event): void {
    event.preventDefault();
    let guess = this.guessForm.value.guess!;
    this.userId = this.route.snapshot.paramMap.get('uid')!;
    this.gameId = this.route.snapshot.paramMap.get('gid')!;

    if (guess !== "") {
      this.data.makeGuess(this.userId, this.gameId, guess).subscribe((res) => {
        if (res.msg !== undefined) {
          alert(res.msg);
        }
        else {
          this.gameState = res as Game;
          this.updateView(res as Game);
        }
      });
    }
    this.guessForm.reset();
  }

  goBack(): void {
    this.location.back();
  }
}
