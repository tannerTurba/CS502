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
  user: string = this.route.snapshot.paramMap.get('uid')!;
  @Input() food!: Food;
  @Input() uid!: string;
  @Input() hid!: string;

  constructor(
    private data: DataService,
    private route: ActivatedRoute,
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
      this.data.setSharedIngredient(this.user, this.hid, this.food).subscribe((res) => {
        this.food = res;
      });
    }
    else {
      this.data.addUserIngredient(this.user, this.food).subscribe((res) => {
        this.food = res;
      });
    }
  }
  
}
