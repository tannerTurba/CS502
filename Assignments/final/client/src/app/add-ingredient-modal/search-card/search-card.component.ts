import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Food } from '../../food';
import { DataService } from '../../data.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-card',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-card.component.html',
  styleUrl: './search-card.component.css'
})
export class SearchCardComponent {
  uid: string = this.route.snapshot.paramMap.get('uid')!;
  @Input() food!: Food;
  @Output() delete: EventEmitter<Food> = new EventEmitter();

  constructor(
    private data: DataService,
    private route: ActivatedRoute
  ) {
    // this.food.quantity = 0;
  }

  decrement(): void {
    if (this.food.quantity == undefined || Number.isNaN(this.food.quantity)) {
      this.food.quantity = 0;
    }
    else if (this.food.quantity > 0) {
      this.food.quantity--;
    }
  }

  increment(): void {
    if (this.food.quantity == undefined || Number.isNaN(this.food.quantity)) {
      this.food.quantity = 0;
    }
    this.food.quantity++;
  }

  removeAll(): void {
    this.delete.emit(this.food);
  }

  addIngredient(): void {
    this.data.addIngredient(this.uid, this.food).subscribe();
  }

  // updateQuantity(): void {
  //   this.data.setQuantity(this.food.userId, this.food._id, this.food.quantity).subscribe();
  // }
}
