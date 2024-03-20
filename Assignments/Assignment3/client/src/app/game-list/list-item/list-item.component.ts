import { Component, Input } from '@angular/core';
import { Game } from '../../game';

@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [],
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.css'
})
export class ListItemComponent {
  @Input() game!: Game;

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
}