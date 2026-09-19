import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageResponse } from '../../shared/models/page.response.model';
import { RentalDisplayModel } from '@features/rentals/model/rental-display-model';
import { map, Observable, of, shareReplay, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { RentalDetailModel } from '@features/rentals/model/rental-detail-model';
import { RentalEnumsResponse } from '@features/rentals/model/rental-enums-model';
import { CreateRentalRequest } from '@features/rentals/model/create-rental-request-model';
import { RentalCreatedModel } from '@features/rentals/model/rental-created-model';
import { RentalOperationalModel } from '@features/rentals/model/rental-operational-model ';
import { CacheDuration, CacheService } from '@core/cache/cache.service';
import { UserService } from '@core/user/user.service';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  private readonly apiUrl: string = environment.apiUrl;

  private readonly RENTAL_DETAIL_CACHE_KEY = 'rental-detail';

  private readonly RENTAL_ENUMS_CACHE_KEY = 'rental-enums';

  constructor(
    private http: HttpClient,
    private cacheService: CacheService,
    private userService: UserService,
  ) {}

  createRental(request: CreateRentalRequest): Observable<RentalCreatedModel> {
    return this.http.post<RentalDetailModel>(`${this.apiUrl}/rental`, request);
  }

  startPreparing(rentalId: string): Observable<void> {
    return this.http.patch<void>(
      `${this.apiUrl}/rental/${rentalId}/start-preparing`,
      {},
    );
  }

  cancelRental(rentalId: string): Observable<void> {
    return this.http.patch<void>(
      `${this.apiUrl}/rental/${rentalId}/cancel`,
      {},
    );
  }

  shipRental(rentalId: string): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/rental/${rentalId}/ship`, {});
  }

  markInUse(rentalId: string): Observable<RentalDisplayModel> {
    return this.http.patch<RentalDisplayModel>(
      `${this.apiUrl}/rental/${rentalId}/in-use`,
      {},
    );
  }

  requestReturn(rentalId: string): Observable<void> {
    return this.http.patch<void>(
      `${this.apiUrl}/rental/${rentalId}/request-return`,
      {},
    );
  }

  shipReturnRental(rentalId: string): Observable<void> {
    return this.http.patch<void>(
      `${this.apiUrl}/rental/${rentalId}/return-shipped`,
      {},
    );
  }

  confirmReturn(rentalId: string): Observable<void> {
    return this.http.patch<void>(
      `${this.apiUrl}/rental/${rentalId}/returned`,
      {},
    );
  }

  getRentalDetail(rentalId: string): Observable<RentalDetailModel> {
    const currentUser = this.userService.currentUser();

    if (!currentUser) {
      return this.http.get<RentalDetailModel>(
        `${this.apiUrl}/rental/find/${rentalId}`,
      );
    }

    const cacheKey = `${currentUser.id}:${this.RENTAL_DETAIL_CACHE_KEY}:${rentalId}`;

    const cached = this.cacheService.get<RentalDetailModel>(cacheKey);

    if (cached) {
      return this.getOperationalData(rentalId).pipe(
        map((operational) => ({
          ...cached,
          status: operational.status,
          startDate: operational.startDate,
          endDate: operational.endDate,
          updatedAt: operational.updatedAt,
        })),
      );
    }

    return this.http
      .get<RentalDetailModel>(`${this.apiUrl}/rental/find/${rentalId}`)
      .pipe(
        tap((response) => {
          this.cacheService.set(cacheKey, response, CacheDuration.LONG);
        }),
        shareReplay(1),
      );
  }

  getOperationalData(rentalId: string): Observable<RentalOperationalModel> {
    return this.http.get<RentalOperationalModel>(
      `${this.apiUrl}/rental/find/operational/${rentalId}`,
    );
  }

  getRenting(
    page: number,
    size: number,
  ): Observable<PageResponse<RentalDisplayModel>> {
    const params = new HttpParams().set('page', page).set('size', size);

    return this.http.get<PageResponse<RentalDisplayModel>>(
      this.apiUrl + '/rental/find/rented',
      { params },
    );
  }

  getRentingOut(
    page: number,
    size: number,
  ): Observable<PageResponse<RentalDisplayModel>> {
    const params = new HttpParams().set('page', page).set('size', size);

    return this.http.get<PageResponse<RentalDisplayModel>>(
      this.apiUrl + '/rental/find/userRentals',
      { params },
    );
  }

  getRentalEnums(): Observable<RentalEnumsResponse> {
    const cached = this.cacheService.get<RentalEnumsResponse>(
      this.RENTAL_ENUMS_CACHE_KEY,
    );

    if (cached) {
      return of(cached);
    }

    return this.http
      .get<RentalEnumsResponse>(`${this.apiUrl}/rental/enums`)
      .pipe(
        tap((response) => {
          this.cacheService.set(
            this.RENTAL_ENUMS_CACHE_KEY,
            response,
            CacheDuration.LONG,
          );
        }),
        shareReplay(1),
      );
  }
}
