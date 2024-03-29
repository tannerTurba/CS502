import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { Metadata } from '../../metadata';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Defaults } from '../../defaults';
import { Font } from '../../font';
import { Level } from '../../level';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  userId: string;
  metadata$: Observable<Metadata>;
  defaults$: Observable<Defaults>;

  constructor(private data: DataService, private router: Router, private route: ActivatedRoute) {
    this.userId = this.route.snapshot.paramMap.get('uid')!;
    this.metadata$ = this.data.getMetadata();
    this.defaults$ = this.data.getDefaults(this.userId);
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
    let word = (document.getElementById('word') as HTMLInputElement).value;
    let guess = (document.getElementById('guess') as HTMLInputElement).value;
    let fore = (document.getElementById('fore') as HTMLInputElement).value;
    let fontVal = (document.getElementById('font') as HTMLInputElement).value;
    let levelVal = (document.getElementById('level') as HTMLInputElement).value;

    this.data.getMetadata().subscribe((res) => {
      let fontObj = res.fonts.filter((f) => f.rule == fontVal)[0];
      let levelObj = res.levels.filter((l) => l.name == levelVal)[0];

      let defaults: Defaults = {
        font: fontObj,
        level: levelObj, 
        colors: {
          guess: guess,
          fore: fore,
          word: word
        }
      };

      this.data.setDefaults(this.userId, defaults).subscribe();
    });
  }

  logout(): void {
    this.data.logout().subscribe((res) => {
      console.log(res);
      this.router.navigateByUrl(`login`);
    });
  }

  ngOnInit(): void {
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

    this.metadata$.subscribe((meta) => {
      // Set font options using metadata.
      meta.fonts.forEach((font) => {
        let fontLink = document.createElement('link');
        fontLink.setAttribute('href', font.url);
        fontLink.setAttribute('rel', 'stylesheet');
        document.getElementsByTagName('head')[0].appendChild(fontLink);
      });
    });
  }
}
