import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageResponse } from '@shared/models/page.response.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ItemFeed } from '@core/item/model/item-feed-model';
import { FeedFilterStateModel } from './model/feed-filter-state';

@Injectable({
  providedIn: 'root'
})
@Injectable({
  providedIn: 'root'
})
export class FeedService {

  private readonly apiUrl = `${environment.apiUrl}/item`;

  constructor(private readonly http: HttpClient) { }

  getItemFeed(
    filters: FeedFilterStateModel,
    page: number = 0,
    size: number = 20
  ): Observable<PageResponse<ItemFeed>> {

    let params = new HttpParams()
      .set('page', page)
      .set('size', size);

    if (filters.title.trim()) {
      params = params.set('name', filters.title.trim());
    }

    if (filters.subCategory) {
      params = params.set('subCategory', filters.subCategory);
    }

    if (filters.condition) {
      params = params.set('itemCondition', filters.condition);
    }

    if (filters.sort) {
      params = params.set('sort', filters.sort);
    }

    return this.http.get<PageResponse<ItemFeed>>(
      `${this.apiUrl}/item/feed`,
      { params }
    );
  }
}