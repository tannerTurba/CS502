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
  @Input() food!: Food;
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

  get image() {
    return (this.food && this.food.image) ? this.food.image : "assets/images/empty.jpg";
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
    return (this.nutrients && this.nutrients.totalNutrients && this.nutrients.totalNutrients.FAT) ? this.round(this.nutrients.totalNutrients.FAT.quantity) + this.nutrients.totalNutrients.FAT.unit : "";
  }

  get fatPercent() {
    return (this.nutrients && this.nutrients.totalDaily && this.nutrients.totalDaily && this.nutrients.totalDaily.FAT) ? this.round(this.nutrients.totalDaily.FAT.quantity) : "0";
  }

  get satFat() {
    return (this.nutrients && this.nutrients.totalNutrients && this.nutrients.totalNutrients.FASAT) ? this.round(this.nutrients.totalNutrients.FASAT.quantity) + this.nutrients.totalNutrients.FASAT.unit : "";
  }

  get satFatPercent() {
    return (this.nutrients && this.nutrients.totalDaily && this.nutrients.totalDaily.FASAT) ? this.round(this.nutrients.totalDaily.FASAT.quantity) : "0";
  }

  get transFat() {
    return (this.nutrients && this.nutrients.totalNutrients && this.nutrients.totalNutrients.FATRN) ? this.round(this.nutrients.totalNutrients.FATRN.quantity) + this.nutrients.totalNutrients.FATRN.unit : "";
  }

  get cholesterol() {
    return (this.nutrients && this.nutrients.totalNutrients && this.nutrients.totalNutrients.CHOLE) ? this.round(this.nutrients.totalNutrients.CHOLE.quantity) + this.nutrients.totalNutrients.CHOLE.unit : "";
  }

  get cholesterolPercent() {
    return (this.nutrients && this.nutrients.totalDaily && this.nutrients.totalDaily.CHOLE) ? this.round(this.nutrients.totalDaily.CHOLE.quantity) : "0";
  }

  get sodium() {
    return (this.nutrients && this.nutrients.totalNutrients && this.nutrients.totalNutrients.NA) ? this.round(this.nutrients.totalNutrients.NA.quantity) + this.nutrients.totalNutrients.NA.unit : "";
  }

  get sodiumPercent() {
    return (this.nutrients && this.nutrients.totalDaily && this.nutrients.totalDaily.NA) ? this.round(this.nutrients.totalDaily.NA.quantity) : "0";
  }

  get carbs() {
    return (this.nutrients && this.nutrients.totalNutrients && this.nutrients.totalNutrients.CHOCDF) ? this.round(this.nutrients.totalNutrients.CHOCDF.quantity) + this.nutrients.totalNutrients.CHOCDF.unit : "";
  }

  get carbsPercent() {
    return (this.nutrients && this.nutrients.totalDaily && this.nutrients.totalDaily.CHOCDF) ? this.round(this.nutrients.totalDaily.CHOCDF.quantity) : "0";
  }

  get fiber() {
    return (this.nutrients && this.nutrients.totalNutrients && this.nutrients.totalNutrients.FIBTG) ? this.round(this.nutrients.totalNutrients.FIBTG.quantity) + this.nutrients.totalNutrients.FIBTG.unit : "";
  }

  get fiberPercent() {
    return (this.nutrients && this.nutrients.totalDaily && this.nutrients.totalDaily.FIBTG) ? this.round(this.nutrients.totalDaily.FIBTG.quantity) : "0";
  }

  get sugar() {
    return (this.nutrients && this.nutrients.totalNutrients && this.nutrients.totalNutrients.SUGAR) ? this.round(this.nutrients.totalNutrients.SUGAR.quantity) + this.nutrients.totalNutrients.SUGAR.unit : "";
  }

  get protein() {
    return (this.nutrients && this.nutrients.totalNutrients && this.nutrients.totalNutrients.PROCNT) ? this.round(this.nutrients.totalNutrients.PROCNT.quantity) + this.nutrients.totalNutrients.PROCNT.unit : "";
  }

  get proteinPercent() {
    return (this.nutrients && this.nutrients.totalDaily && this.nutrients.totalDaily.PROCNT) ? this.round(this.nutrients.totalDaily.PROCNT.quantity) : "0";
  }

  get vitD() {
    return (this.nutrients && this.nutrients.totalDaily && this.nutrients.totalDaily.VITD) ? this.round(this.nutrients.totalDaily.VITD.quantity) : "0";
  }

  get vitC() {
    return (this.nutrients && this.nutrients.totalDaily && this.nutrients.totalDaily.VITC) ? this.round(this.nutrients.totalDaily.VITC.quantity) : "0";
  }

  get calcium() {
    return (this.nutrients && this.nutrients.totalDaily && this.nutrients.totalDaily.CA) ? this.round(this.nutrients.totalDaily.CA.quantity) : "0";
  }

  get iron() {
    return (this.nutrients && this.nutrients.totalDaily && this.nutrients.totalDaily.FE) ? this.round(this.nutrients.totalDaily.FE.quantity) : "0";
  }

  get potassium() {
    return (this.nutrients && this.nutrients.totalDaily && this.nutrients.totalDaily.K) ? this.round(this.nutrients.totalDaily.K.quantity) : "0";
  }

  get healthLabels() {
    if (this.nutrients && this.nutrients.healthLabels) {
      let labels = '';
      this.nutrients.healthLabels.forEach((label) => {
        labels += label.toLowerCase().replaceAll('_', ' ') + " • ";
      });
      return labels.slice(0, labels.length - 2);
    }
    else {
      return '';
    }
  }

}