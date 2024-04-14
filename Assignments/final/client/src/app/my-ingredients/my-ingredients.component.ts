import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { IngredientCardComponent } from './ingredient-card/ingredient-card.component';
import { AddCardComponent } from '../add-card/add-card.component';
import { initFlowbite } from 'flowbite';
import { ActivatedRoute } from '@angular/router';
import { Food } from '../food';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-ingredients',
  standalone: true,
  imports: [
    NavbarComponent,
    IngredientCardComponent,
    AddCardComponent, 
    CommonModule
  ],
  templateUrl: './my-ingredients.component.html',
  styleUrl: './my-ingredients.component.css'
})
export class MyIngredientsComponent implements OnInit {
  uid: string = this.route.snapshot.paramMap.get('uid')!;
  foods!: [Food];

  constructor(
    private route: ActivatedRoute,
    private data: DataService
  ) {
    this.data.getIngredients(this.uid).subscribe((food) => {
      this.foods = food;
    });
  }

  ngOnInit(): void {
    initFlowbite();
  }

  deleteIngredient(food: Food): void {
    this.data.setQuantity(food.userId, food._id, -1).subscribe();
    this.data.getIngredients(this.uid).subscribe((food) => {
      this.foods = food;
    });
  }
}
