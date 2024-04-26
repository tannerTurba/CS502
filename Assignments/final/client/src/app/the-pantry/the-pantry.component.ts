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
import { FoodService } from '../food.service';
import { MoreNutrients } from '../more-nutrients';
import { InfoModalComponent } from '../info-modal/info-modal.component';

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
    FormsModule,
    InfoModalComponent
  ],
  templateUrl: './the-pantry.component.html',
  styleUrl: './the-pantry.component.css'
})
export class ThePantryComponent implements OnInit {
  uid: string = this.route.snapshot.paramMap.get('uid')!;
  foodInfo!: Food;
  nutrients!: MoreNutrients;
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
  foods!: string[];
  search: string = '';
  prev: string = '';
  next: string = '';
  page: string = '1';

  constructor(
    private route: ActivatedRoute,
    private data: DataService,
    private router: Router, 
    private foodService: FoodService
  ) { }
  
  ngOnInit(): void {
    initFlowbite();
    this.onSubmit();
  }

  sendToModal(food: Food): void {
    this.foodService.getNutrients(food.foodId).subscribe((res) => {
      this.foodInfo = food;
      this.nutrients = res
    });
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
    this.data.getUserInfo(this.uid).subscribe((userInfo) => {
      if (userInfo.householdId !== undefined && userInfo.householdId !== '') {
        this.userInfo = userInfo;
        this.data.getHousehold(this.uid, userInfo.householdId).subscribe((household) => {
          this.household = household;
          this.data.getSharedFood(this.uid, userInfo.householdId, this.search, this.page).subscribe((res) => {
            this.foods = res.foodIds;
            this.prev = res.prev;
            this.next = res.next;
          });
        });
      }
    });
  }

  clearFilter(): void {
    this.search = '';
    this.onSubmit();
  }

  prevPage(): void {
    if (this.prev != '-1') {
      this.page = this.prev;
      this.data.getSharedFood(this.uid, this.userInfo.householdId, this.search, this.page).subscribe((res) => {
        this.foods = res.foodIds;
        this.prev = res.prev;
        this.next = res.next;
      });
    }
  }

  nextPage(): void {
    if (this.next != '-1') {
      this.page = this.next;
      this.data.getSharedFood(this.uid, this.userInfo.householdId, this.search, this.page).subscribe((res) => {
        this.foods = res.foodIds;
        this.prev = res.prev;
        this.next = res.next;
      });
    }
  }
}
