import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { DataService } from '../data.service';
import { Household } from '../household';
import { User } from '../user';
import { FormsModule } from '@angular/forms';
import { windowWhen } from 'rxjs';

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
  isInitialiazed: boolean = true;
  
  constructor(
    private route: ActivatedRoute,
    private data: DataService,
    private router: Router
  ) {
    this.data.getUserInfo(this.uid).subscribe((userInfo) => {
      if (userInfo.householdId === '') {
        this.isInitialiazed = false;
      }
      else {
        this.data.getHousehold(this.uid, userInfo.householdId).subscribe((household) => {
          this.household = household;
        });
        this.userInfo = userInfo;
      }
    });
  }
  
  ngOnInit(): void {
    initFlowbite();
  }

  sendInvite(): void {
    this.data.addMemberToHousehold(this.uid, this.household._id, this.inviteUser).subscribe((res) => {
      if (typeof res === 'string') {
        window.alert(res)
      }
      else {
        this.household = res as Household;
      }
    })
  }

  removeMember(mid: string): void {
    this.data.removeMemberFromHousehold(this.uid, this.household._id, mid).subscribe((res) => {
      this.household = res;
    });
  }

  makeAdmin(mid: string): void {
    this.data.reassignAdmin(this.uid, this.household._id, mid).subscribe((res) => {
      this.household = res;
      this.router.navigateByUrl(`users/${this.uid}/the-pantry`);
    });
  }
}
