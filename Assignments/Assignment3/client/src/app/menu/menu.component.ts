import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Metadata } from '../metadata';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  constructor(private data: DataService) { }

  ngOnInit(): void {
    let metadata: Metadata = await this.data.getMetadata();
  
    // Set font options using metadata.
    metadata.fonts.forEach((font) => {
      $('#font').append($('<option>', {
        value: font.rule,
        id: font.family,
        text: font.family
      }));
      $('head').append(`<link href="${font.url}" rel="stylesheet">`);
    });
  
    // Set level options using metadata.
    metadata.levels.forEach((level) => {
      $('#level').append($('<option>', {
        value: level.name, 
        text: level.name
      }));
    });
  
    // Set default values using metadata.
    $('#word').val(metadata.defaults.colors.wordColor);
    $('#guess').val(metadata.defaults.colors.guessColor);
    $('#fore').val(metadata.defaults.colors.foreColor);
    $('#font').val(metadata.defaults.font.family);
    $('#level').val(metadata.defaults.level.name);
    
    // Add an event listner to change font of select element, based on value.
    document.querySelector('#font').addEventListener("change", function() {
      console.log(this.value);
      if (this.value == "noto-serif-regular") {
        this.className = 'form-select-sm noto-serif-regular';
      }
      else if (this.value == "roboto-regular") {
        this.className = 'form-select-sm roboto-regular';
      }
      else if (this.value == "protest-riot-regular") {
         this.className = 'form-select-sm protest-riot-regular';
      }
    }
  }
}
