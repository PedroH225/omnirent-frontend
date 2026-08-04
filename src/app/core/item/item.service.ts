import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ItemEnumsResponse } from './model/ItemEnumsResponse';
import { ItemFeed } from './model/item-feed-model';
import { PageResponse } from '../../shared/models/page.response.model';
import { ItemDisplay } from './model/item-display-model';
import { ItemRequestModel } from '@features/items/model/item-request-model';
import { ItemCreatedModel } from '@features/items/model/item-created-model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private readonly apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  createItem(newItem: ItemRequestModel): Observable<ItemCreatedModel> {
    return this.http.post<ItemCreatedModel>(`${this.apiUrl}/item`, newItem);
  }

  getItemEnums(): Observable<ItemEnumsResponse> {
    return this.http.get<ItemEnumsResponse>(this.apiUrl + "/item/enums");
  }

  getItemFeedHome(category: string): Observable<PageResponse<ItemFeed>> {
    const params = new HttpParams()
      .set('category', category)
      .set('sort', "NEWEST");

    return this.http.get<PageResponse<ItemFeed>>(this.apiUrl + "/item/feed", { params });
  }

  getUserItems(page: number, size: number): Observable<PageResponse<ItemDisplay>> {
    const params = new HttpParams()
      .set("page", page)
      .set("size", size);
  
    return this.http.get<PageResponse<ItemDisplay>>(this.apiUrl + "/item/find/user/me", { params });
  }
}
