import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Food } from '../../food';
import { DataService } from '../../data.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OwnerRowComponent } from './owner-row/owner-row.component';

@Component({
  selector: 'app-pantry-card',
  standalone: true,
  imports: [FormsModule, OwnerRowComponent],
  templateUrl: './pantry-card.component.html',
  styleUrl: './pantry-card.component.css'
})
export class PantryCardComponent implements OnInit {
  owners!: [Food];
  uid: string = this.route.snapshot.paramMap.get('uid')!;
  @Input() householdId!: string;
  @Input() foodId!: string;
  @Output() delete: EventEmitter<Food> = new EventEmitter();
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
    this.data.getIngredient(this.uid, this.householdId, this.foodId).subscribe((res) => {
      console.log(res);
      this.food = res[0];
      this.owners = res;
    });
    
  }

  decrement(): void {
    this.food.quantity--;

    if (this.food.quantity === 0) {
      this.removeAll();
    }
    else {
      this.data.setQuantity(this.food.userId, this.food._id, this.food.quantity).subscribe((x) => {
        this.food = x;
      });
    }
  }

  increment(): void {
    this.food.quantity++;
    this.data.setQuantity(this.food.userId, this.food._id, this.food.quantity).subscribe((x) => {
      this.food = x;
    });
  }

  removeAll(): void {
    this.delete.emit(this.food);
  }

  updateQuantity(): void {
    this.data.setQuantity(this.food.userId, this.food._id, this.food.quantity).subscribe();
  }
}
