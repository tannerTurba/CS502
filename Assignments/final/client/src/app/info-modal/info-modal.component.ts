import { Component, Input, OnInit } from '@angular/core';
import { Food } from '../food';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-info-modal',
  standalone: true,
  imports: [],
  templateUrl: './info-modal.component.html',
  styleUrl: './info-modal.component.css'
})
export class InfoModalComponent implements OnInit {
  // @Input() modalId!: String;
  @Input() food!: Food;

  constructor() {
    
  }

  ngOnInit(): void {
    // initFlowbite();
    console.log(this.food);
  }
}
