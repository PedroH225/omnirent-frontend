import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, shareReplay } from 'rxjs';
import { ItemEnumsResponse } from './model/ItemEnumsResponse';
import { ItemFeed } from './model/item-feed-model';
import { PageResponse } from '../../shared/models/page.response.model';
import { ItemDisplay } from './model/item-display-model';
import { ItemRequestModel } from '@features/items/model/item-request-model';
import { ItemCreatedModel } from '@features/items/model/item-created-model';
import { ItemImageForm } from '@features/items/model/item-image-form-model';
import { ItemDetailModel } from './model/item-detail-model';
import { UpdateItemRequestModel } from '@features/items/model/item-update-request-model';
import { ItemUpdatedModel } from './model/item-updated-model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private readonly apiUrl: string = environment.apiUrl;

  private itemEnums$?: Observable<ItemEnumsResponse>;

  constructor(private http: HttpClient) { }

  getItemDetail(itemId: string): Observable<ItemDetailModel> {
    return this.http.get<ItemDetailModel>(`${this.apiUrl}/item/find/${itemId}`);
  }
  
  createItem(newItem: ItemRequestModel): Observable<ItemCreatedModel> {
    return this.http.post<ItemCreatedModel>(`${this.apiUrl}/item`, newItem);
  }

  updateItem(updatedItem: UpdateItemRequestModel): Observable<ItemUpdatedModel> {
    return this.http.put<ItemUpdatedModel>(`${this.apiUrl}/item`, updatedItem);
  }

  changeAvailability(itemId: string): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/item/changeAvailability/${itemId}`, {});
  }

  changeAddress(itemId: string, addressId: string): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/item/changeAddress/${itemId}/${addressId}`, {});
  }

  changeSubcategory(itemId: string, subCategoryId: string): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/item/changeSubCategory/${itemId}/${subCategoryId}`, {});
  }

  uploadImages(itemId: string, images: ItemImageForm[]): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/item/${itemId}/images`, this.buildImagesFormData(images));
  }

  getItemEnums(): Observable<ItemEnumsResponse> {
    if (!this.itemEnums$) {
      this.itemEnums$ = this.http
        .get<ItemEnumsResponse>(this.apiUrl + '/item/enums')
        .pipe(
          shareReplay(1)
        );
    }

    return this.itemEnums$;
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
