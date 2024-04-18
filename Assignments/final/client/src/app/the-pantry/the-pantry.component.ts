import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { PantryCardComponent } from './pantry-card/pantry-card.component';
import { AddCardComponent } from '../add-card/add-card.component';
import { initFlowbite } from 'flowbite';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DataService } from '../data.service';
import { Food } from '../food';
import { AddIngredientModalComponent } from '../add-ingredient-modal/add-ingredient-modal.component';
import { Household } from '../household';

@Component({
  selector: 'app-the-pantry',
  standalone: true,
  imports: [
    NavbarComponent,
    PantryCardComponent,
    AddCardComponent,
    CommonModule,
    AddIngredientModalComponent
  ],
  templateUrl: './the-pantry.component.html',
  styleUrl: './the-pantry.component.css'
})
export class ThePantryComponent implements OnInit {
  uid: string = this.route.snapshot.paramMap.get('uid')!;
  household!: Household;
  foods!: [string];

  constructor(
    private route: ActivatedRoute,
    private data: DataService
  ) {
    this.data.getUserInfo(this.uid).subscribe((userInfo) => {
      this.data.getHousehold(this.uid, userInfo.householdId).subscribe((household) => {
        this.household = household;
        this.foods = household.foodIds;
        console.log(household);
      });
    });
  }

  ngOnInit(): void {
    initFlowbite();
  }

  deleteIngredient(food: Food): void {
    // this.data.setQuantity(food.userId, food._id, -1).subscribe();
    // this.data.getIngredients(this.uid).subscribe((food) => {
    //   this.foods = food;
    // });
  }
}
