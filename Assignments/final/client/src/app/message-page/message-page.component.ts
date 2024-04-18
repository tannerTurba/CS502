import { Component, EventEmitter, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { initFlowbite } from 'flowbite';
import { RequestBubbleComponent } from './request-bubble/request-bubble.component';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { User } from '../user';
import { Message } from '../message';

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
  selectedContact: string = '';
  directory!: [User];
  messages!: [Message];

  constructor(
    private route: ActivatedRoute,
    private data: DataService
  ) {
    this.uid = this.route.snapshot.paramMap.get('uid')!;
    this.getMessages();
  }

  getMessages(): void {
    this.data.getMessageDirectory(this.uid).subscribe((res) => {
      if (typeof(res) !== 'string') {
        this.directory = res;
        if (this.selectedContact === '' && res.length > 0) {
          this.selectedContact = res[0]._id;
        }

        this.data.getUserMessages(this.uid, this.selectedContact).subscribe((res) => {
          this.messages = res;
        });
      }
    });
  }

  ngOnInit(): void {
    initFlowbite();
  }

  refresh(x: string): void {
    if (x == 'refresh') {
      this.getMessages();
    }
  }

  selectContact(cid: string): void {
    this.selectedContact = cid;
    this.getMessages();
  }
}
