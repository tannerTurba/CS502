import { Component, Input } from '@angular/core';
import { Message } from '../message';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-request-bubble',
  standalone: true,
  imports: [],
  templateUrl: './request-bubble.component.html',
  styleUrl: './request-bubble.component.css'
})
export class RequestBubbleComponent {
  uid: string;
  @Input() message!: Message;

  constructor(
    private route: ActivatedRoute,
    private data: DataService
  ) {
    this.uid = this.route.snapshot.paramMap.get('uid')!;
  }

  approve(): void {
    let contactId = this.message.from;
    let foodId = this.message.food._id;
    let quantity = this.message.quantity;
    
    this.data.setQuantity(contactId, foodId, quantity, 'true').subscribe();
    this.data.setQuantity(this.uid, foodId, quantity * -1, 'true').subscribe();
    this.data.updateMessage(this.uid, this.message._id, 'approved').subscribe((res) => {
      this.message = res;
    });
  }

  deny(): void {
    this.data.updateMessage(this.uid, this.message._id, 'denied').subscribe((res) => {
      this.message = res;
    });
  }
}
