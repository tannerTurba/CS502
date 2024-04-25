import { Component, Input, OnInit } from '@angular/core';
import { Food } from '../food';
import { FoodService } from '../food.service';
import { MoreNutrients } from '../more-nutrients';

@Component({
  selector: 'app-info-modal',
  standalone: true,
  imports: [],
  templateUrl: './info-modal.component.html',
  styleUrl: './info-modal.component.css'
})
export class InfoModalComponent implements OnInit {
  @Input() food: Food = {
    _id : "",
    foodId : "",
    label : "",
    knownAs : "",
    nutrients : {
      ENERC_KCAL : 0, 
      PROCNT : 0,
      FAT : 0,
      CHOCDF : 0, 
      FIBTG : 0
    },
    brand : "", 
    category : "", 
    categoryLabel : "", 
    foodContentsLabel : "",
    image : "", 
    servingSizes : [{
      uri : "",
      label : "",
      quantity : 0
    }],
    servingsPerContainer : 0,
    quantity: 0,
    userId: ""
  };
  @Input() nutrients!: MoreNutrients;

  constructor(
    private foodData: FoodService
  ) {

  }

  ngOnInit(): void {

  }

  round(num: number): number {
    return Math.round(num * 100) / 100;
  }

  get label() {
    return (this.food && this.food.label) ? this.food.label : null;
  }

  get servingSize() {
    return (this.nutrients && this.nutrients.ingredients && this.nutrients.ingredients[0].parsed && this.nutrients.ingredients[0].parsed[0].servingSizes) ? this.nutrients.ingredients[0].parsed[0].servingSizes[0].quantity : "";
  }

  get servingSizeLabel() {
    return (this.nutrients && this.nutrients.ingredients && this.nutrients.ingredients[0].parsed && this.nutrients.ingredients[0].parsed[0].servingSizes) ? this.nutrients.ingredients[0].parsed[0].servingSizes[0].label : "";
  }

  get calories() {
    return (this.nutrients) ? this.nutrients.calories : ""
  }

  get totalFat() {
    return (this.nutrients && this.nutrients.totalNutrients) ? this.round(this.nutrients.totalNutrients.FAT.quantity) + this.nutrients.totalNutrients.FAT.unit : "";
  }

  get fatPercent() {
    return (this.nutrients && this.nutrients.totalDaily) ? this.round(this.nutrients.totalDaily.FAT.quantity) : "0";
  }

  get satFat() {
    return (this.nutrients && this.nutrients.totalNutrients) ? this.round(this.nutrients.totalNutrients.FASAT.quantity) + this.nutrients.totalNutrients.FASAT.unit : "";
  }

  get satFatPercent() {
    return (this.nutrients && this.nutrients.totalDaily) ? this.round(this.nutrients.totalDaily.FASAT.quantity) : "0";
  }

  get transFat() {
    return (this.nutrients && this.nutrients.totalNutrients) ? this.round(this.nutrients.totalNutrients.FATRN.quantity) + this.nutrients.totalNutrients.FATRN.unit : "";
  }

  get cholesterol() {
    return (this.nutrients && this.nutrients.totalNutrients) ? this.round(this.nutrients.totalNutrients.CHOLE.quantity) + this.nutrients.totalNutrients.CHOLE.unit : "";
  }

  get cholesterolPercent() {
    return (this.nutrients && this.nutrients.totalDaily) ? this.round(this.nutrients.totalDaily.CHOLE.quantity) : "0";
  }

  get sodium() {
    return (this.nutrients && this.nutrients.totalNutrients) ? this.round(this.nutrients.totalNutrients.NA.quantity) + this.nutrients.totalNutrients.NA.unit : "";
  }

  get sodiumPercent() {
    return (this.nutrients && this.nutrients.totalDaily) ? this.round(this.nutrients.totalDaily.NA.quantity) : "0";
  }

  get carbs() {
    return (this.nutrients && this.nutrients.totalNutrients) ? this.round(this.nutrients.totalNutrients.CHOCDF.quantity) + this.nutrients.totalNutrients.CHOCDF.unit : "";
  }

  get carbsPercent() {
    return (this.nutrients && this.nutrients.totalDaily) ? this.round(this.nutrients.totalDaily.CHOCDF.quantity) : "0";
  }

  get fiber() {
    return (this.nutrients && this.nutrients.totalNutrients) ? this.round(this.nutrients.totalNutrients.FIBTG.quantity) + this.nutrients.totalNutrients.FIBTG.unit : "";
  }

  get fiberPercent() {
    return (this.nutrients && this.nutrients.totalDaily) ? this.round(this.nutrients.totalDaily.FIBTG.quantity) : "0";
  }

  get sugar() {
    return (this.nutrients && this.nutrients.totalNutrients) ? this.round(this.nutrients.totalNutrients.SUGAR.quantity) + this.nutrients.totalNutrients.SUGAR.unit : "";
  }

  get protein() {
    return (this.nutrients && this.nutrients.totalNutrients) ? this.round(this.nutrients.totalNutrients.PROCNT.quantity) + this.nutrients.totalNutrients.PROCNT.unit : "";
  }

  get proteinPercent() {
    return (this.nutrients && this.nutrients.totalDaily) ? this.round(this.nutrients.totalDaily.PROCNT.quantity) : "0";
  }

  get vitD() {
    return (this.nutrients && this.nutrients.totalDaily) ? this.round(this.nutrients.totalDaily.VITD.quantity) : "0";
  }

  get vitC() {
    return (this.nutrients && this.nutrients.totalDaily) ? this.round(this.nutrients.totalDaily.VITC.quantity) : "0";
  }

  get calcium() {
    return (this.nutrients && this.nutrients.totalDaily) ? this.round(this.nutrients.totalDaily.CA.quantity) : "0";
  }

  get iron() {
    return (this.nutrients && this.nutrients.totalDaily) ? this.round(this.nutrients.totalDaily.FE.quantity) : "0";
  }

  get potassium() {
    return (this.nutrients && this.nutrients.totalDaily) ? this.round(this.nutrients.totalDaily.K.quantity) : "0";
  }
}