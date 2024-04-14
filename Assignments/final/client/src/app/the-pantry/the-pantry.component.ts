import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { PantryCardComponent } from './pantry-card/pantry-card.component';
import { AddCardComponent } from '../add-card/add-card.component';
import { initFlowbite } from 'flowbite';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DataService } from '../data.service';
import { Food } from '../food';

@Component({
  selector: 'app-the-pantry',
  standalone: true,
  imports: [
    NavbarComponent,
    PantryCardComponent,
    AddCardComponent,
    CommonModule
  ],
  templateUrl: './the-pantry.component.html',
  styleUrl: './the-pantry.component.css'
})
export class ThePantryComponent implements OnInit {
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
