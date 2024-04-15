import { Component, Input, OnInit } from '@angular/core';
import { Food } from '../food';
import { initFlowbite } from 'flowbite';
import { FoodService } from '../food.service';

@Component({
  selector: 'app-info-modal',
  standalone: true,
  imports: [],
  templateUrl: './info-modal.component.html',
  styleUrl: './info-modal.component.css'
})
export class InfoModalComponent implements OnInit {
  // @Input() modalId!: String;
  @Input() food!: Food;
  //nutritionalFacts: ;

  constructor(
    private foodData: FoodService
  ) {
    
  }

  ngOnInit(): void {
    // initFlowbite();
    console.log(this.food);
    // this.foodData.getNutrients(this.food.foodId).subscribe();
  }
}
