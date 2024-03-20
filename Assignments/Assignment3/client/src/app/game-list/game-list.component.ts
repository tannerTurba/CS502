import { Component, OnInit } from '@angular/core';
import { MenuComponent } from './menu/menu.component';
import { ListItemComponent } from './list-item/list-item.component';
import { Game } from '../game';
import { DataService } from '../data.service';

@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [
    MenuComponent,
    ListItemComponent
  ],
  templateUrl: './game-list.component.html',
  styleUrl: './game-list.component.css'
})
export class GameListComponent implements OnInit {
  constructor(private data: DataService) { }
  gameList: Game[] = [];

  ngOnInit(): void {
    this.data.getAllGames()
      .then(games => {
        this.gameList = games as Game[];
      })
      .catch(error => {
        console.error("Failed to get all games: ", error);
      });
  }
}
