import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, of, share, shareReplay, switchMap, tap } from 'rxjs';
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
import { CacheDuration, CacheService } from '@core/cache/cache.service';
import { ItemAnalisysModel } from './model/item-analisys-model';
import { EnumOption } from '@shared/models/EnumOption';
import { ItemRejectRequest } from './model/item-reject-request';
import { LastUpdate } from '@shared/models/last-update-model';
import { UserService } from '@core/user/user.service';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private readonly apiUrl: string = environment.apiUrl;

  private itemEnums$?: Observable<ItemEnumsResponse>;
  private readonly ITEM_ENUMS_CACHE_KEY = 'item-enums';

  private rejectionReasons$?: Observable<EnumOption[]>;
  private readonly ITEM_REJECTION_REASONS_CACHE_KEY = 'item-rejection-reasons';
  private readonly ITEM_HOME_KEY = 'item-home';
  private readonly ITEM_SEARCH_CACHE_KEY = 'item-search';
  private readonly ITEM_DETAIL_CACHE_KEY = 'item-detail';
  private readonly USER_ITEMS_CACHE_KEY = 'user-items';

  constructor(
    private http: HttpClient,
    private readonly cacheService: CacheService,
    private readonly userService: UserService,
  ) {}

  getItemDetail(itemId: string): Observable<ItemDetailModel> {
    const cacheKey = `${this.ITEM_DETAIL_CACHE_KEY}:${itemId}`;
    const cached = this.cacheService.get<ItemDetailModel>(cacheKey);

    if (!cached) {
      return this.fetchAndCacheItemDetail(itemId, cacheKey);
    }

    return this.getLastUpdate(itemId).pipe(
      switchMap((lastUpdate) => {
        if (cached.updatedAt === lastUpdate.updatedAt) {
          return of(cached);
        }

        return this.fetchAndCacheItemDetail(itemId, cacheKey);
      }),
    );
  }

  private fetchAndCacheItemDetail(
    itemId: string,
    cacheKey: string,
  ): Observable<ItemDetailModel> {
    return this.http
      .get<ItemDetailModel>(`${this.apiUrl}/item/find/${itemId}`)
      .pipe(
        tap((response) => {
          this.cacheService.set(cacheKey, response, CacheDuration.LONG);
        }),
        shareReplay(1),
      );
  }

  createItem(newItem: ItemRequestModel): Observable<ItemCreatedModel> {
    return this.http
      .post<ItemCreatedModel>(`${this.apiUrl}/item`, newItem)
      .pipe(tap(() => this.clearCachedUserItems()));
  }

  updateItem(
    updatedItem: UpdateItemRequestModel,
  ): Observable<ItemUpdatedModel> {
    return this.http
      .put<ItemUpdatedModel>(`${this.apiUrl}/item`, updatedItem)
      .pipe(tap(() => this.clearCachedUserItems()));
  }

  changeAvailability(itemId: string): Observable<void> {
    return this.http
      .patch<void>(`${this.apiUrl}/item/changeAvailability/${itemId}`, {})
      .pipe(tap(() => this.clearCachedUserItems()));
  }

  changeAddress(itemId: string, addressId: string): Observable<void> {
    return this.http.patch<void>(
      `${this.apiUrl}/item/changeAddress/${itemId}/${addressId}`,
      {},
    );
  }

  changeSubcategory(itemId: string, subCategoryId: string): Observable<void> {
    return this.http.patch<void>(
      `${this.apiUrl}/item/changeSubCategory/${itemId}/${subCategoryId}`,
      {},
    );
  }

  uploadImages(itemId: string, images: ItemImageForm[]): Observable<void> {
    return this.http.post<void>(
      `${this.apiUrl}/item/${itemId}/images`,
      this.buildImagesFormData(images),
    );
  }

  getItemEnums(): Observable<ItemEnumsResponse> {
    if (!this.itemEnums$) {
      const cached = this.cacheService.get<ItemEnumsResponse>(
        this.ITEM_ENUMS_CACHE_KEY,
      );

      if (cached) {
        this.itemEnums$ = of(cached);
      } else {
        this.itemEnums$ = this.http
          .get<ItemEnumsResponse>(this.apiUrl + '/item/enums')
          .pipe(
            tap((response) => {
              this.cacheService.set(
                this.ITEM_ENUMS_CACHE_KEY,
                response,
                CacheDuration.LONG,
              );
            }),
            shareReplay(1),
          );
      }
    }

    return this.itemEnums$;
  }

  getItemRejectReasons(): Observable<EnumOption[]> {
    if (!this.rejectionReasons$) {
      const cached = this.cacheService.get<EnumOption[]>(
        this.ITEM_REJECTION_REASONS_CACHE_KEY,
      );

      if (cached) {
        this.rejectionReasons$ = of(cached);
      } else {
        this.rejectionReasons$ = this.http
          .get<EnumOption[]>(`${this.apiUrl}/admin/items/enums`)
          .pipe(
            tap((response) => {
              this.cacheService.set(
                this.ITEM_REJECTION_REASONS_CACHE_KEY,
                response,
                CacheDuration.LONG,
              );
            }),
            shareReplay(1),
          );
      }
    }

    return this.rejectionReasons$;
  }

  getItemFeedHome(category: string): Observable<PageResponse<ItemFeed>> {
    const categoryKey = `${this.ITEM_HOME_KEY}:${category.toLowerCase()}`;

    const cached = this.cacheService.get<PageResponse<ItemFeed>>(categoryKey);
    if (cached) {
      return of(cached);
    }

    const params = new HttpParams()
      .set('category', category)
      .set('sort', 'NEWEST');

    const response$ = this.http
      .get<PageResponse<ItemFeed>>(`${this.apiUrl}/item/feed`, { params })
      .pipe(
        tap((response) => {
          this.cacheService.set(categoryKey, response, CacheDuration.MEDIUM);
        }),
        shareReplay(1),
      );
    return response$;
  }

  getItemFeed(
    name: string | null,
    category: string | null,
    subCategory: string | null,
    itemCondition: string | null,
    sort: string | null,
    page: number,
    size: number,
  ): Observable<PageResponse<ItemFeed>> {
    let params = new HttpParams().set('page', page).set('size', size);

    if (name) {
      params = params.set('name', name);
    }

    if (category) {
      params = params.set('category', category);
    }

    if (subCategory) {
      params = params.set('subCategory', subCategory);
    }

    if (itemCondition) {
      params = params.set('itemCondition', itemCondition);
    }

    if (sort) {
      params = params.set('sort', sort);
    }

    const searchCacheKey = `${this.ITEM_SEARCH_CACHE_KEY}:${params.toString()}`;

    const cached$ =
      this.cacheService.get<PageResponse<ItemFeed>>(searchCacheKey);
    if (cached$) {
      return of(cached$);
    }

    const response$ = this.http
      .get<PageResponse<ItemFeed>>(`${this.apiUrl}/item/feed`, {
        params,
      })
      .pipe(
        tap((response) => {
          this.cacheService.set(searchCacheKey, response, CacheDuration.SHORT);
        }),
        shareReplay(1),
      );

    return response$;
  }

  getUserItems(
    page: number,
    size: number,
  ): Observable<PageResponse<ItemDisplay>> {
    const currentUser = this.userService.currentUser();

    const params = new HttpParams().set('page', page).set('size', size);

    if (!currentUser) {
      return this.http.get<PageResponse<ItemDisplay>>(
        `${this.apiUrl}/item/find/user/me`,
        { params },
      );
    }

    const cacheKey = `${currentUser.id}:${this.USER_ITEMS_CACHE_KEY}:${params.toString()}`;

    const cached = this.cacheService.get<PageResponse<ItemDisplay>>(cacheKey);

    if (cached) {
      return of(cached);
    }

    return this.http
      .get<
        PageResponse<ItemDisplay>
      >(`${this.apiUrl}/item/find/user/me`, { params })
      .pipe(
        tap((response) => {
          this.cacheService.set(cacheKey, response, CacheDuration.VERY_SHORT);
        }),
        shareReplay(1),
      );
  }

  getUnderAnalisys(
    page = 0,
    size = 20,
  ): Observable<PageResponse<ItemAnalisysModel>> {
    const params = new HttpParams().set('page', page).set('size', size);

    return this.http.get<PageResponse<ItemAnalisysModel>>(
      `${this.apiUrl}/admin/items/analisys`,
      { params },
    );
  }

  searchItems(
    name?: string,
    status?: string,
    page = 0,
    size = 10,
  ): Observable<PageResponse<ItemDisplay>> {
    let params = new HttpParams().set('page', page).set('size', size);

    if (name) {
      params = params.set('name', name);
    }

    if (status) {
      params = params.set('status', status);
    }

    return this.http.get<PageResponse<ItemDisplay>>(
      `${this.apiUrl}/admin/items`,
      { params },
    );
  }

  approveItem(itemId: string): Observable<void> {
    return this.http.patch<void>(
      `${this.apiUrl}/admin/items/approve/${itemId}`,
      {},
    );
  }

  rejectItem(
    itemId: string,
    rejectRequest: ItemRejectRequest,
  ): Observable<void> {
    return this.http.patch<void>(
      `${this.apiUrl}/admin/items/reject/${itemId}`,
      rejectRequest,
    );
  }

  toggleItemBlocking(itemId: string): Observable<void> {
    return this.http.patch<void>(
      `${this.apiUrl}/admin/items/status/${itemId}`,
      {},
    );
  }

  private clearCachedUserItems(): void {
    const currentUser = this.userService.currentUser();

    if (!currentUser) {
      return;
    }

    this.cacheService.clearByPrefix(
      `${currentUser.id}:${this.USER_ITEMS_CACHE_KEY}`,
    );
  }

  private getLastUpdate(itemId: string): Observable<LastUpdate> {
    return this.http.get<LastUpdate>(
      `${this.apiUrl}/item/lastUpdate/${itemId}`,
    );
  }

  private buildImagesFormData(images: ItemImageForm[]): FormData {
    const formData = new FormData();

    images.forEach((image) => {
      formData.append(image.tempId, image.file);
    });

    formData.append(
      'request',
      new Blob(
        [
          JSON.stringify({
            images: images.map((image) => ({
              tempId: image.tempId,
              order: image.order,
            })),
          }),
        ],
        {
          type: 'application/json',
        },
      ),
    );

    return formData;
  }
}
