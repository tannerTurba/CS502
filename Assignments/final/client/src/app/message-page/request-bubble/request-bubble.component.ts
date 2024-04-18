import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Message } from '../../message';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../data.service';
import { Food } from '../../food';

@Component({
  selector: 'app-request-bubble',
  standalone: true,
  imports: [],
  templateUrl: './request-bubble.component.html',
  styleUrl: './request-bubble.component.css'
})
export class RequestBubbleComponent implements OnInit {
  uid: string;
  ownedFood!: Food;
  @Input() message!: Message;
  @Output() refresh: EventEmitter<string> = new EventEmitter();
  fulfillmentQuantity: number = 0;

  constructor(
    private route: ActivatedRoute,
    private data: DataService
  ) {
    this.uid = this.route.snapshot.paramMap.get('uid')!;
  }
  
  ngOnInit(): void {
    this.data.getUserIngredient(this.uid, this.message.food.foodId).subscribe((res) => {
      if (res) {
        this.ownedFood = res;
        if (res.quantity > this.message.quantity) {
          this.fulfillmentQuantity = this.message.quantity;
        }
        else {
          this.fulfillmentQuantity = res.quantity;
        }
      }
      else {
        this.fulfillmentQuantity = 0;
      }
    });

  }

  approve(): void {
    let contactId = this.message.from;
    let foodId = this.message.food.foodId;
    let quantity = this.fulfillmentQuantity;
    
    if (quantity > 0) {
      this.data.transferIngredient(foodId, this.uid, contactId, quantity).subscribe((res) => {
        console.log(res);
      });
      this.data.updateMessage(this.uid, this.message._id, 'approved', quantity).subscribe((res) => {
        this.message = res;
        this.refresh.emit('refresh');
      });
    }
  }

  deny(): void {
    this.data.updateMessage(this.uid, this.message._id, 'denied', this.message.quantity).subscribe((res) => {
      this.message = res;
    });
  }

  decrement(): void {
    if (this.fulfillmentQuantity > 1) {
      this.fulfillmentQuantity--;
    }
  }

  increment(): void {
    if (this.fulfillmentQuantity < this.ownedFood.quantity) {
      this.fulfillmentQuantity++;
    }
  }

  updateQuantity(event: Event): void {
    let target = event.target as HTMLInputElement;
    let val = Number.parseInt(target.value);
    if (0 < val && val <= this.ownedFood.quantity) {
      this.fulfillmentQuantity = val;
    }
    else {
      target.value = '' + this.ownedFood.quantity;
    }
  }
}
