import { Component, EventEmitter, Input, numberAttribute, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../../data.service';
import { Food } from '../../../food';
import { User } from '../../../user';

@Component({
  selector: 'app-owner-row',
  standalone: true,
  imports: [],
  templateUrl: './owner-row.component.html',
  styleUrl: './owner-row.component.css'
})
export class OwnerRowComponent {
  @Input() food!: Food;
  uid: string = this.route.snapshot.paramMap.get('uid')!;
  requestQuantity: number = -1;
  buttonText: string = 'Request';
  user: User = {
    _id: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "",
    householdId: "",
  };

  constructor(
    private data: DataService,
    private route: ActivatedRoute
  ) {

  }
  
  ngOnInit(): void {
    this.data.getUserInfo(this.food.userId).subscribe((userInfo) => {
      this.user = userInfo;
    });
  }

  makeRequest(): void {
    let contactId = this.user._id;
    let foodId = this.food.foodId;
    this.data.createMessage(this.uid, contactId, foodId, this.requestQuantity).subscribe((x) => {
      this.buttonText = 'Sent!';
    });
  }

  recordVal(event: Event): void {
    let target = event.target as HTMLSelectElement;
    let val = Number.parseInt(target.value);

    if (0 < val && val <= this.food.quantity) {
      this.requestQuantity = val;
    }
    else {
      this.requestQuantity = -1;
    }
  }
}
