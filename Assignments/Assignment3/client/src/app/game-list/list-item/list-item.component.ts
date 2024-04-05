import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { Game } from '../../game';

@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [RouterLink, RouterModule],
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.css'
})
export class ListItemComponent {
  constructor(private route: ActivatedRoute) { }
  @Input() game!: Game;
}