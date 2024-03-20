import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameListComponent } from './game-list/game-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    GameListComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'homes';
}
