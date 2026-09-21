import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of, shareReplay, tap } from 'rxjs';
import { AddressModel } from '@features/address/model/address-model';
import { AddressRequestModel } from '@features/address/model/address-request-model';
import { UserService } from '@core/user/user.service';
import { CacheDuration, CacheService } from '@core/cache/cache.service';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  private readonly apiUrl: string = environment.apiUrl;

  private USER_ADDRESSES_KEY = 'adresses';

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private cacheService: CacheService,
  ) {}

  getUserAddresses(): Observable<AddressModel[]> {
    const currentUser = this.userService.currentUser();

    if (!currentUser) {
      return of();
    }

    const addressesKey = `${currentUser.id}:${this.USER_ADDRESSES_KEY}`;

    const cached = this.cacheService.get<AddressModel[]>(addressesKey);

    if (cached) {
      return of(cached);
    }

    return this.http.get<AddressModel[]>(`${this.apiUrl}/address/user`).pipe(
      tap((response) => {
        this.cacheService.set(addressesKey, response, CacheDuration.MEDIUM);
      }),
      shareReplay(1),
    );
  }

  deleteAddress(addressId: string): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/address/${addressId}`)
      .pipe(tap(() => this.clearCachedAddresses()));
  }

  addAddress(newAddress: AddressRequestModel): Observable<AddressModel> {
    return this.http
      .post<AddressModel>(`${this.apiUrl}/address`, newAddress)
      .pipe(tap(() => this.clearCachedAddresses()));
  }

  updateAddress(updatedAddress: AddressRequestModel): Observable<AddressModel> {
    return this.http
      .put<AddressModel>(`${this.apiUrl}/address`, updatedAddress)
      .pipe(tap(() => this.clearCachedAddresses()));
  }

  private clearCachedAddresses() {
    const currentUser = this.userService.currentUser();

    if (!currentUser) {
      return;
    }

    this.cacheService.remove(`${currentUser.id}:${this.USER_ADDRESSES_KEY}`);
  }
}
