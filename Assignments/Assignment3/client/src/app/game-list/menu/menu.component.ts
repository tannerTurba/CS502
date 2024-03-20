import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { Metadata } from '../../metadata';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.data.getMetadata()
      .then (metadata => {
        // Set font options using metadata.
        metadata.fonts.forEach((font) => {
          let optionElement = document.createElement('option');
          optionElement.setAttribute('value', font.rule);
          optionElement.setAttribute('id', font.family);
          optionElement.innerText = font.family;
          document.getElementById('font')?.appendChild(optionElement);

          let fontLink = document.createElement('link');
          fontLink.setAttribute('href', font.url);
          fontLink.setAttribute('rel', 'stylesheet');
          document.getElementsByTagName('head')[0].appendChild(fontLink);
        });
      
        // Set level options using metadata.
        metadata.levels.forEach((level) => {
          let optionElement = document.createElement('option');
          optionElement.setAttribute('value', level.name);
          optionElement.innerText = level.name;
          document.getElementById('level')?.appendChild(optionElement);
        });
      
        // Set default values using metadata.
        (document.getElementById('word') as HTMLInputElement).value = metadata.defaults.colors.word;
        (document.getElementById('guess') as HTMLInputElement).value = metadata.defaults.colors.guess;
        (document.getElementById('fore') as HTMLInputElement).value = metadata.defaults.colors.fore;
        (document.getElementById('font') as HTMLInputElement).value = metadata.defaults.font.rule;
        (document.getElementById('level') as HTMLInputElement).value = metadata.defaults.level.name;
        
        // Add an event listner to change font of select element, based on value.
        (document.getElementById('font') as HTMLInputElement)?.addEventListener("change", function() {
          if (this.value == "noto-serif-regular") {
            this.className = 'form-select-sm noto-serif-regular';
          }
          else if (this.value == "roboto-regular") {
            this.className = 'form-select-sm roboto-regular';
          }
          else if (this.value == "protest-riot-regular") {
            this.className = 'form-select-sm protest-riot-regular';
          }
        });
      })
      .catch (error => {
        console.error(`Failed to initialize menu component: ${error}`);
      });

    /**
     * Add event listner to the new game button so a 
     * game is created when clicked.
    */
    document.querySelector("#newGameBtn")?.addEventListener("click", async function() {
      alert("new game button clicked!");
      // let game = await createGame();
      // currentGameId = game.id;
      // $('#menu').slideUp('slow');
      // $('#guesser').slideDown('slow');
      // updateGuessView(game);
    });

    /**
     * Add event listner to the set theme button so a 
     * default theme is set when clicked.
    */
    document.querySelector("#setThemeBtn")?.addEventListener("click", async function() {
      alert("set theme button clicked!");
      
    });

    
  }

}
