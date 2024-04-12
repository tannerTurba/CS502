import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { IngredientCardComponent } from '../ingredient-card/ingredient-card.component';
import { GridListComponent } from '../grid-list/grid-list.component';

@Component({
  selector: 'app-my-ingredients',
  standalone: true,
  imports: [
    NavbarComponent,
    IngredientCardComponent,
    GridListComponent
  ],
  templateUrl: './my-ingredients.component.html',
  styleUrl: './my-ingredients.component.css'
})
export class MyIngredientsComponent {

}
