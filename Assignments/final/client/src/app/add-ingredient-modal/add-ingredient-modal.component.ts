import { Component, Input } from '@angular/core';
import { FoodService } from '../food.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Food } from '../food';
import { SearchCardComponent } from './search-card/search-card.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-ingredient-modal',
  standalone: true,
  imports: [
    SearchCardComponent,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-ingredient-modal.component.html',
  styleUrl: './add-ingredient-modal.component.css'
})
export class AddIngredientModalComponent {
  // uid: string = this.route.snapshot.paramMap.get('uid')!;
  @Input() uid!: string;
  @Input() hid!: string;
  foods!: Food[];
  searchForm = this.formBuilder.group({
    keyword: ''
  });

  constructor(
    private foodSearch: FoodService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {

  }

  keywordSearch(event: Event): void {
    event.preventDefault();
    let keyword = this.searchForm.value.keyword!;

    if (keyword !== '') {
      this.foodSearch.keywordSearch(keyword).subscribe((res) => {
        this.foods = res.hints.map(x => x.food);
        console.log(res.hints);
      });
    }

    this.searchForm.reset();
  }
}
