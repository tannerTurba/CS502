import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { IngredientCardComponent } from './ingredient-card/ingredient-card.component';
import { AddCardComponent } from '../add-card/add-card.component';
import { initFlowbite } from 'flowbite';
import { ActivatedRoute } from '@angular/router';
import { Food } from '../food';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';
import { AddIngredientModalComponent } from '../add-ingredient-modal/add-ingredient-modal.component';
import { FoodService } from '../food.service';
import { InfoModalComponent } from '../info-modal/info-modal.component';
import { MoreNutrients } from '../more-nutrients';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-ingredients',
  standalone: true,
  imports: [
    NavbarComponent,
    IngredientCardComponent,
    AddCardComponent, 
    CommonModule,
    AddIngredientModalComponent,
    InfoModalComponent, 
    FormsModule
  ],
  templateUrl: './my-ingredients.component.html',
  styleUrl: './my-ingredients.component.css'
})
export class MyIngredientsComponent implements OnInit {
  uid: string = this.route.snapshot.paramMap.get('uid')!;
  foods!: [Food];
  foodInfo!: Food;
  nutrients!: MoreNutrients;
  search: string = '';
  prev: string = '';
  next: string = '';
  page: string = '1';

  constructor(
    private route: ActivatedRoute,
    private data: DataService, 
    private foodService: FoodService
  ) {
    this.data.getIngredients(this.uid, this.search, this.page).subscribe((res) => {
      this.foods = res.food;
    });
  }

  ngOnInit(): void {
    initFlowbite();
  }

  deleteIngredient(food: Food): void {
    this.data.setQuantity(food.userId, food._id, -1).subscribe();
    this.data.getIngredients(this.uid, this.search, this.page).subscribe((res) => {
      this.foods = res.food;
    });
  }

  sendToModal(food: Food): void {
    this.foodService.getNutrients(food.foodId).subscribe((res) => {
      this.foodInfo = food;
      this.nutrients = res
    });
  }

  onSubmit(): void {
    this.data.getIngredients(this.uid, this.search, this.page).subscribe((res) => {
      this.foods = res.food;
    });
  }

  clearFilter(): void {
    this.search = '';
    this.onSubmit();
  }

  prevPage(): void {
    console.log(this.prev);
    if (this.prev != '-1') {
      this.page = this.prev;
      this.data.getIngredients(this.uid, this.search, this.page).subscribe((res) => {
        this.foods = res.food;
        this.prev = res.prev;
        this.next = res.next;
      });
    }
  }

  nextPage(): void {
    if (this.next != '-1') {
      this.page = this.next;
      this.data.getIngredients(this.uid, this.search, this.page).subscribe((res) => {
        this.foods = res.food;
        this.prev = res.prev;
        this.next = res.next;
      });
    }
  }
}
