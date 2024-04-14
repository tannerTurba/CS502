import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Food } from '../../food';
import { DataService } from '../../data.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ingredient-card',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './ingredient-card.component.html',
  styleUrl: './ingredient-card.component.css'
})
export class IngredientCardComponent {
  @Input() food!: Food;
  @Output() delete: EventEmitter<Food> = new EventEmitter();

  constructor(private data: DataService) { }

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
