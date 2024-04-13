import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KeywordResult } from './keyword-result';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  foodUrl: string = '/api/food-database/v2/parser';
  appId: string = '35b313ca';
  appKey: string = '5fe592b84538ad54e7a6d8f45f321e34';
  nutritionType: string = 'cooking';

  constructor(private http: HttpClient) { }

  keywordSearch(keyword: string): Observable<KeywordResult> {
    return this.http.get<KeywordResult>(this.foodUrl, {
      params: {
        'app_id': this.appId,
        'app_key': this.appKey,
        'ingr': keyword,
        'nutrition-type': this.nutritionType
      }
    });
  }

}
