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
import { ItemImageForm } from '@features/items/model/item-image-form-model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private readonly apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  createItem(newItem: ItemRequestModel): Observable<ItemCreatedModel> {
    return this.http.post<ItemCreatedModel>(`${this.apiUrl}/item`, newItem);
  }

  uploadImages(itemId: string, images: ItemImageForm[]): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/item/${itemId}/images`, this.buildImagesFormData(images));
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

  private buildImagesFormData(images: ItemImageForm[]): FormData {

    const formData = new FormData();

    images.forEach(image => {
      formData.append(image.tempId, image.file);
    });

    formData.append(
      'request',
      new Blob(
        [
          JSON.stringify({
            images: images.map(image => ({
              tempId: image.tempId,
              order: image.order
            }))
          })
        ],
        {
          type: 'application/json'
        }
      )
    );

    return formData;
  }
}
