import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { CategoryResponse } from './model/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getCategoriesWithSub() : Observable<CategoryResponse[]> {
    return this.http.get<CategoryResponse[]>(this.apiUrl + "/category/findAll");
  }
}
