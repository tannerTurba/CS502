import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { PantryCardComponent } from './pantry-card/pantry-card.component';
import { AddCardComponent } from '../add-card/add-card.component';
import { initFlowbite } from 'flowbite';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DataService } from '../data.service';
import { Food } from '../food';
import { AddIngredientModalComponent } from '../add-ingredient-modal/add-ingredient-modal.component';
import { Household } from '../household';
import { User } from '../user';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-the-pantry',
  standalone: true,
  imports: [
    NavbarComponent,
    PantryCardComponent,
    AddCardComponent,
    CommonModule,
    AddIngredientModalComponent,
    RouterModule,
    FormsModule
  ],
  templateUrl: './the-pantry.component.html',
  styleUrl: './the-pantry.component.css'
})
export class ThePantryComponent implements OnInit {
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
  foods!: [string];
  search: string = '';

  constructor(
    private route: ActivatedRoute,
    private data: DataService,
    private router: Router
  ) { }
  
  ngOnInit(): void {
    initFlowbite();
    this.onSubmit();
  }

  deleteIngredient(food: Food): void {
    // this.data.setQuantity(food.userId, food._id, -1).subscribe();
    // this.data.getIngredients(this.uid).subscribe((food) => {
    //   this.foods = food;
    // });
  }

  leaveGroup(): void {
    this.data.removeMemberFromHousehold(this.uid, this.household._id, this.uid).subscribe((res) => {
      this.router.navigateByUrl(`users/${this.uid}/my-ingredients`);
    });
  }

  startGroup(): void {
    this.data.createHousehold(this.uid).subscribe((res) => {
      this.household = res;
      this.ngOnInit();
    });
  }

  onSubmit(): void {
    console.log(this.search);
    this.data.getUserInfo(this.uid).subscribe((userInfo) => {
      if (userInfo.householdId !== undefined && userInfo.householdId !== '') {
        this.userInfo = userInfo;
        this.data.getHousehold(this.uid, userInfo.householdId).subscribe((household) => {
          this.household = household;
          this.data.getSharedFood(this.uid, userInfo.householdId, this.search).subscribe((foodIds) => {
              this.foods = foodIds;
          });
        });
      }
    });
  }

  clearFilter(): void {
    this.search = '';
    this.onSubmit();
  }
}
