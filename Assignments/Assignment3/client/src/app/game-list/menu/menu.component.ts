import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { Metadata } from '../../metadata';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  metadata$: Observable<Metadata>;
  // fonts$: Observable<[Font]>;

  constructor(private data: DataService, private router: Router) {
    this.metadata$ = this.data.getMetadata();
  }

  styleFont(): void {
    // Add an event listner to change font of select element, based on value.
    (document.getElementById('font') as HTMLInputElement)?.addEventListener("change", function() {
      if (this.value == "noto-serif-regular") {
        this.className = 'form-select-sm noto-serif-regular';
      }
      else if (this.value == "roboto-regular") {
        this.className = 'form-select-sm roboto-regular';
      }
      else if (this.value == "protest-riot-regular") {
        this.className = 'form-select-sm protest-riot-regular';
      }
    });
  }

  createGame(): void {
    alert("new game button clicked!");
  }

  setTheme(): void {
    alert("set theme button clicked!");
  }

  logout(): void {
    alert("logout button clicked!");
    this.data.logout().subscribe((res) => {
      console.log(res);
      this.router.navigateByUrl(`login`);
    });
  }

  ngOnInit(): void {
    this.metadata$.subscribe((meta) => {
      // Set font options using metadata.
      meta.fonts.forEach((font) => {
        let fontLink = document.createElement('link');
        fontLink.setAttribute('href', font.url);
        fontLink.setAttribute('rel', 'stylesheet');
        document.getElementsByTagName('head')[0].appendChild(fontLink);
      });
    });
    // Set default values using metadata.
    // (document.getElementById('word') as HTMLInputElement).value = metadata.defaults.colors.word;
    // (document.getElementById('guess') as HTMLInputElement).value = metadata.defaults.colors.guess;
    // (document.getElementById('fore') as HTMLInputElement).value = metadata.defaults.colors.fore;
    // (document.getElementById('font') as HTMLInputElement).value = metadata.defaults.font.rule;
    // (document.getElementById('level') as HTMLInputElement).value = metadata.defaults.level.name;
        
    
  }

}
