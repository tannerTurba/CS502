import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Food } from '../../food';
import { DataService } from '../../data.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OwnerRowComponent } from './owner-row/owner-row.component';
import { initFlowbite } from 'flowbite';
import { PantryCardOwner } from '../../pantry-card-owner';

@Component({
  selector: 'app-pantry-card',
  standalone: true,
  imports: [FormsModule, OwnerRowComponent],
  templateUrl: './pantry-card.component.html',
  styleUrl: './pantry-card.component.css'
})
export class PantryCardComponent implements OnInit {
  owners!: [PantryCardOwner];
  uid: string = this.route.snapshot.paramMap.get('uid')!;
  @Input() householdId!: string;
  @Input() foodId!: string;
  @Output() delete: EventEmitter<Food> = new EventEmitter();
  @Output() loadModal: EventEmitter<Food> = new EventEmitter();
  food: Food = {
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
  }

  constructor(
    private data: DataService,
    private route: ActivatedRoute
  ) {
    
  }
  
  ngOnInit(): void {
    initFlowbite();
    this.data.getSharedIngredient(this.uid, this.householdId, this.foodId).subscribe((res) => {
      this.owners = res;

      let sharedFood = undefined;
      for (let i = 0; i < res.length; i++) {
        let food = res[i].food;
        if (food.userId === this.householdId) {
          sharedFood = food;
        }
      }

      if (sharedFood !== undefined) {
        this.food = sharedFood;
      }
      else if (res.length > 0) {
        this.food = structuredClone(res[0].food);
        this.food.quantity = 0;
      }
    });
    
  }

  decrement(): void {
    if (this.food.quantity > 0) {
      this.food.quantity--;
      this.data.setSharedIngredient(this.uid, this.householdId, this.food).subscribe();
      // this.data.setQuantity(this.householdId, this.food._id, this.food.quantity).subscribe((x) => {
      //   this.food = x;
      // });
    }
  }

  increment(): void {
    this.food.quantity++;
    this.data.setSharedIngredient(this.uid, this.householdId, this.food).subscribe();
    // this.data.setQuantity(this.householdId, this.food._id, this.food.quantity).subscribe((x) => {
    //   this.food = x;
    // });
  }

  removeAll(): void {
    this.food.quantity = 0;
    this.data.setSharedIngredient(this.uid, this.householdId, this.food).subscribe();
    // this.data.setQuantity(this.householdId, this.food._id, this.food.quantity).subscribe((x) => {
    //   this.food = x;
    // });
  }

  updateQuantity(): void {
    // this.data.setQuantity(this.householdId, this.food._id, this.food.quantity).subscribe();
    this.data.setSharedIngredient(this.uid, this.householdId, this.food).subscribe();
  }
}
