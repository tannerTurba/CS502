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
    // document.getElementById('guessesRemaining')!.innerText = `${game.remaining} guesses remaining.`;
    // document.getElementById('displayView')!.innerHTML = this.generateBlockWord(game.view, game.font.rule, game.colors.word, game.colors.fore);
    // document.getElementById('displayGuesses')!.innerHTML = this.generateBlockWord(game.guesses, game.font.rule, game.colors.guess, game.colors.fore);

    let imageContainer = document.getElementById('imageContainer');
    if (game.status === 'victory') { 
      this.image = 'winImage';
    }
    else if (game.status === 'loss') {
      this.image = 'loseImage';
    }
    this.gameIsOver = this.gameState.status != 'unfinished';
    // if (game.status !== 'unfinished') {
    //   this.gameIsOver = true;
    // }
  }

  makeGuess(event: Event): void {
    event.preventDefault();
    // let guessInput = 
    // document.getElementById('guessInput') as HTMLInputElement;
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
    // this.guessForm.value.guess = '';
    this.guessForm.reset();
  }

  goBack(): void {
    this.location.back();
  }

  // /**
  //  * Creates a colored block-word.
  //  * @param word The work to make into a block-word.
  //  * @param fontRule The CSS rule to apply to the word.
  //  * @param wordColor A string representation of the hex color to use on the word.
  //  * @param blockColor A string representation of the hex color to use on the color block.
  //  * @returns The HTML containing a colored block-word.
  //  */
  // generateBlockWord(word: string, fontRule: string, wordColor: string, blockColor: string): string {
  //   let phrase = "";
  //   word.split("").forEach((letter) => {
  //     phrase = phrase.concat(`<p class="phrase ${fontRule}" style="background-color: ${wordColor}; color: ${blockColor}">${letter.toUpperCase()}</p>`);
  //   });
  //   return phrase;
  // }

  // getViewDisplay(): string {
  //   let display = "";
  //   this.gameState.subscribe((game) => {
  //     console.log(game);
  //     // display = this.generateBlockWord(game.view, game.font.rule, game.colors.word, game.colors.fore);
  //   });
  //   return display;
  // }

  // getGuessDisplay(): string {
  //   let display = "";
  //   this.gameState.subscribe((game) => {
  //     console.log(game);
  //     // display = this.generateBlockWord(game.guesses, game.font.rule, game.colors.guess, game.colors.fore);
  //   });
  //   return display;
  // }

//   setImage(): string {
//     let image = '';
//     this.gameState.subscribe((game) => {
//       if (game.status === 'victory') { 
//         image = 'winImage';
//       }
//       else if (game.status === 'loss') {
//         image = 'loseImage';
//       }
//     });
//     return image;
//   }
}
