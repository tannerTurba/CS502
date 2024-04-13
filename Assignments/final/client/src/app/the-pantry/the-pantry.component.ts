import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { PantryCardComponent } from '../pantry-card/pantry-card.component';
import { AddCardComponent } from '../add-card/add-card.component';
import { initFlowbite } from 'flowbite';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-the-pantry',
  standalone: true,
  imports: [
    NavbarComponent,
    PantryCardComponent,
    AddCardComponent
  ],
  templateUrl: './the-pantry.component.html',
  styleUrl: './the-pantry.component.css'
})
export class ThePantryComponent implements OnInit {
  uid: string;

  constructor(
    private route: ActivatedRoute,
  ) {
    this.uid = this.route.snapshot.paramMap.get('uid')!;
  }

  ngOnInit(): void {
    initFlowbite();
  }
}
