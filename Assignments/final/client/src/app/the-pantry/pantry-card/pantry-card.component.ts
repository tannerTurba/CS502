import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Food } from '../../food';
import { DataService } from '../../data.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pantry-card',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './pantry-card.component.html',
  styleUrl: './pantry-card.component.css'
})
export class PantryCardComponent implements OnInit {
  food!: Food;
  owners!: [Food];
  uid: string = this.route.snapshot.paramMap.get('uid')!;
  @Input() householdId!: string;
  @Input() foodId!: string;
  @Output() delete: EventEmitter<Food> = new EventEmitter();

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
