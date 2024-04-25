import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KeywordResult } from './keyword-result';
import { Observable } from 'rxjs';
import { MoreNutrients } from './more-nutrients';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  apiVersion: string = 'api/v1';
  // baseUrl: string = 'https://api.edamam.com/api/food-database/v2';
  // appId: string = '35b313ca';
  // appKey: string = '5fe592b84538ad54e7a6d8f45f321e34';
  // nutritionType: string = 'cooking';

  constructor(private http: HttpClient) { }

  // keywordSearch(keyword: string): Observable<KeywordResult> {
  //   return this.http.get<KeywordResult>(`${this.baseUrl}/parser`, {
  //     params: {
  //       'app_id': this.appId,
  //       'app_key': this.appKey,
  //       'ingr': keyword,
  //       'nutrition-type': this.nutritionType
  //     }
  //   });
  // }

  // getNutrients(foodId: string): Observable<MoreNutrients> {
  //   return this.http.post<MoreNutrients>(`${this.baseUrl}/nutrients`, 
  //   {
  //     "ingredients": [
  //       {
  //         "quantity": 1,
  //         "measureURI": "http://www.edamam.com/ontologies/edamam.owl#Measure_serving",
  //         "qualifiers": [],
  //         "foodId": foodId
  //       }
  //     ]
  //   },
  //   {
  //     params: {
  //       'app_id': this.appId,
  //       'app_key': this.appKey
  //     }
  //   });
  // }

  keywordSearch(keyword: string): Observable<KeywordResult> {
    return this.http.get<KeywordResult>(`${this.apiVersion}/foods`, {
      params: {
        'keyword': keyword
      }
    });
  }

  getNutrients(foodId: string): Observable<MoreNutrients> {
    return this.http.get<MoreNutrients>(`${this.apiVersion}/foods/${foodId}`);
  }
}
