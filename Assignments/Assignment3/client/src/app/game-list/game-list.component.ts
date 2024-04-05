import { Component } from '@angular/core';
import { MenuComponent } from './menu/menu.component';
import { ListItemComponent } from './list-item/list-item.component';
import { Game } from '../game';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [
    MenuComponent,
    ListItemComponent,
    CommonModule
  ],
  templateUrl: './game-list.component.html',
  styleUrl: './game-list.component.css'
})
export class GameListComponent {
  games$: Observable<[Game]>;
  userId: string;

  constructor(
    private data: DataService,
    private route: ActivatedRoute
  ) { 
    this.userId = this.route.snapshot.paramMap.get('uid')!;
    this.games$ = this.data.getAllGames(this.userId);
  }
}
