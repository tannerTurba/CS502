import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Game } from '../game';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent implements OnInit {
  constructor(
    private data: DataService,
    private route: ActivatedRoute,
    private location: Location
  ) { }
  @Input() gameState!: Game;

  makeGuess(guess:string): void {
    let gameId = this.route.snapshot.paramMap.get('id')!;
    if (guess !== "") {
      let gameState = this.data.makeGuess(gameId, guess)
        .subscribe(gameState => this.gameState = gameState);
      if (this.gameState.msg !== '') {
        alert(this.gameState.msg);
      }
      // (document.getElementById('guessInput') as HTMLInputElement).value = '';
    }
  }

  goBack(): void {
    this.location.back();
  }

  /**
   * Creates a colored block-word.
   * @param word The work to make into a block-word.
   * @param fontRule The CSS rule to apply to the word.
   * @param wordColor A string representation of the hex color to use on the word.
   * @param blockColor A string representation of the hex color to use on the color block.
   * @returns The HTML containing a colored block-word.
   */
  generateBlockWord(word: string, fontRule: string, wordColor: string, blockColor: string): string {
    let phrase = "";
    word.split("").forEach((letter) => {
      phrase = phrase.concat(`<p class="phrase ${fontRule}" style="background-color: ${wordColor}; color: ${blockColor}">${letter.toUpperCase()}</p>`);
    });
    return phrase;
  }

  // TODO: Make on change
  ngOnInit(): void {
    document.getElementById('displayView')!.innerHTML = this.generateBlockWord(this.gameState.view, this.gameState.font.rule, this.gameState.colors.word, this.gameState.colors.fore);
    document.getElementById('displayGuesses')!.innerHTML = this.generateBlockWord(this.gameState.guesses, this.gameState.font.rule, this.gameState.colors.guess, this.gameState.colors.fore);
    document.getElementById('guessesRemaining')!.innerText = `${this.gameState.remaining} guesses remaining.`;

    // If the game has ended, show the appropriate image.
    if (this.gameState.status === 'victory') { 
      document.getElementById('imageContainer')?.classList.add('winImage');
    }
    else if (this.gameState.status === 'loss') {
      document.getElementById('imageContainer')?.classList.add('loseImage');
    }
  }
}
