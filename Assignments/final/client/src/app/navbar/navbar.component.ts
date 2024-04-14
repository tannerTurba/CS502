import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

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
  uid: string = this.route.snapshot.paramMap.get('uid')!;
  currentRoute: string = this.router.url;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    
  }

}
