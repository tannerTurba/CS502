import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  uid: string;

  constructor(
    private route: ActivatedRoute,
  ) {
    this.uid = this.route.snapshot.paramMap.get('uid')!;
  }

}
