import { Component } from '@angular/core';
import { DataService } from '../../data.service';
import { Metadata } from '../../metadata';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Defaults } from '../../defaults';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  userId: string;
  metadata: Metadata = {
    fonts: [],
    levels: []
  }
  defaults: Defaults = {
    font: {
      category: '',
      family: '',
      rule: '',
      url: '',
    },
    level: {
      rounds: 0,
      minLength: 0,
      maxLenth: 0,
      name: '',
    },
    colors: {
      guess: '',
      fore: '',
      word: '',
    }
  };

  constructor(private data: DataService, private router: Router, private route: ActivatedRoute, private authService: AuthService) {
    this.userId = this.route.snapshot.paramMap.get('uid')!;
    this.data.getMetadata().subscribe((meta: Metadata) => {
      this.metadata = meta;
      meta.fonts.forEach((font) => {
        let fontLink = document.createElement('link');
        fontLink.setAttribute('href', font.url);
        fontLink.setAttribute('rel', 'stylesheet');
        document.getElementsByTagName('head')[0].appendChild(fontLink);
      });
    });
    this.data.getDefaults(this.userId).subscribe((x: Defaults) => this.defaults = x);
  }

  createGame(): void {
    let word = this.defaults.colors.word;
    let guess = this.defaults.colors.guess;
    let fore = this.defaults.colors.fore;
    let font = this.defaults.font.rule;
    let level = this.defaults.level.name;

    this.data.createGame(this.userId, level, font, word, guess, fore).subscribe((game) => {
      this.router.navigateByUrl(`users/${this.userId}/games/${game._id}`);
    });
  }

  setTheme(): void {
    this.data.setDefaults(this.userId, this.defaults).subscribe();
  }

  logout(): void {
    this.data.logout().subscribe();
    this.router.navigateByUrl(`login`);
    this.authService.currentUser = null;
  }
}
