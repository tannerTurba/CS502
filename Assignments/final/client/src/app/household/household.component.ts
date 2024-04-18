import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ActivatedRoute } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { DataService } from '../data.service';
import { Household } from '../household';
import { User } from '../user';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-household',
  standalone: true,
  imports: [
    NavbarComponent,
    FormsModule
  ],
  templateUrl: './household.component.html',
  styleUrl: './household.component.css'
})
export class HouseholdComponent implements OnInit {
  uid: string = this.route.snapshot.paramMap.get('uid')!;
  userInfo: User = {
    _id: 'string',
    username: 'string',
    password: 'string',
    firstName: 'string',
    lastName: 'string',
    role: 'string',
    status: 'string',
    householdId: 'string'
  };
  household: Household = {
    _id: 'string',
    members: [{
      _id: 'string',
      username: 'string',
      password: 'string',
      firstName: 'string',
      lastName: 'string',
      role: 'string',
      status: 'string',
      householdId: 'string'
    }],
    foodIds: ['string'],
  };
  inviteUser: string = '';
  

  constructor(
    private route: ActivatedRoute,
    private data: DataService
  ) {
    this.data.getUserInfo(this.uid).subscribe((userInfo) => {
      this.data.getHousehold(this.uid, userInfo.householdId).subscribe((household) => {
        this.household = household;
      });
      this.userInfo = userInfo;
    });
  }
  
  ngOnInit(): void {
    initFlowbite();
  }

  sendInvite(): void {
    console.log(this.inviteUser);
  }
}
