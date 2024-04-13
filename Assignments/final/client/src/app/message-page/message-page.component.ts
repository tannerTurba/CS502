import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { initFlowbite } from 'flowbite';
import { RequestBubbleComponent } from '../request-bubble/request-bubble.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-message-page',
  standalone: true,
  imports: [
    NavbarComponent,
    RequestBubbleComponent
  ],
  templateUrl: './message-page.component.html',
  styleUrl: './message-page.component.css'
})
export class MessagePageComponent implements OnInit {
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
