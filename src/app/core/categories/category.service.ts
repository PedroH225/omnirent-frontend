import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, shareReplay } from 'rxjs';
import { CategoryResponse } from './model/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly apiUrl: string = environment.apiUrl;

  private categoriesWithSub$?: Observable<CategoryResponse[]>;

  constructor(private http: HttpClient) { }

  getCategoriesWithSub(): Observable<CategoryResponse[]> {
    if (!this.categoriesWithSub$) {
      this.categoriesWithSub$ = this.http
        .get<CategoryResponse[]>(this.apiUrl + '/category/findAll')
        .pipe(
          shareReplay(1)
        );
    }

    return this.categoriesWithSub$;
  }
}
