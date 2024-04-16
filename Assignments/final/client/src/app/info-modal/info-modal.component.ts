import { Component, Input, OnInit } from '@angular/core';
import { Food } from '../food';
import { initFlowbite } from 'flowbite';
import { FoodService } from '../food.service';
import { MoreNutrients } from '../more-nutrients';

@Component({
  selector: 'app-info-modal',
  standalone: true,
  imports: [],
  templateUrl: './info-modal.component.html',
  styleUrl: './info-modal.component.css'
})
export class InfoModalComponent implements OnInit {
  @Input() food: Food = {
    _id : "",
    foodId : "",
    label : "",
    knownAs : "",
    nutrients : {
      ENERC_KCAL : 0, 
      PROCNT : 0,
      FAT : 0,
      CHOCDF : 0, 
      FIBTG : 0
    },
    brand : "", 
    category : "", 
    categoryLabel : "", 
    foodContentsLabel : "",
    image : "", 
    servingSizes : [{
      uri : "",
      label : "",
      quantity : 0
    }],
    servingsPerContainer : 0,
    quantity: 0,
    userId: ""
  };
  @Input() nutrients!: MoreNutrients;

  constructor(
    private foodData: FoodService
  ) {
    
  }

  ngOnInit(): void {
    // initFlowbite();
    console.log(this.nutrients);
  }

  round(num: number): number {
    return Math.round(num * 100) / 100;
  }
}
