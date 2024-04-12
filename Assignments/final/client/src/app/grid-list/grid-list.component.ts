import { Component } from '@angular/core';
import { IngredientCardComponent } from '../ingredient-card/ingredient-card.component';

@Component({
  selector: 'app-grid-list',
  standalone: true,
  imports: [
    IngredientCardComponent
  ],
  templateUrl: './grid-list.component.html',
  styleUrl: './grid-list.component.css'
})
export class GridListComponent {

}
