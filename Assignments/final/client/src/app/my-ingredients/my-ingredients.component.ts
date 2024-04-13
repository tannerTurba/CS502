import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { IngredientCardComponent } from '../ingredient-card/ingredient-card.component';
import { AddCardComponent } from '../add-card/add-card.component';
import { initFlowbite } from 'flowbite';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-my-ingredients',
  standalone: true,
  imports: [
    NavbarComponent,
    IngredientCardComponent,
    AddCardComponent
  ],
  templateUrl: './my-ingredients.component.html',
  styleUrl: './my-ingredients.component.css'
})
export class MyIngredientsComponent implements OnInit {
  uid: string;

  constructor(
    private route: ActivatedRoute,
  ) {
    this.uid = this.route.snapshot.paramMap.get('uid')!;
  }

  ngOnInit(): void {
    initFlowbite();
  }
}
