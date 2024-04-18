import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Food } from '../../food';
import { DataService } from '../../data.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-card',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-card.component.html',
  styleUrl: './search-card.component.css'
})
export class SearchCardComponent {
  @Input() food!: Food;
  @Input() uid!: string;
  @Input() hid!: string;

  constructor(
    private data: DataService
  ) { }

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

  addIngredient(): void {
    if (this.uid === this.hid) {
      this.data.setSharedIngredient(this.uid, this.hid, this.food).subscribe((res) => {
        this.food = res;
      });
    }
    else {
      this.data.addIngredient(this.uid, this.food).subscribe((res) => {
        this.food = res;
      });
    }
  }
  
}
