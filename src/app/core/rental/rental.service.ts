import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageResponse } from '../../shared/models/page.response.model';
import { RentalDisplayModel } from '@features/rentals/model/rental-display-model';
import { Observable, shareReplay } from 'rxjs';
import { environment } from '../../../environments/environment';
import { RentalDetailComponent } from '@features/rentals/rental-detail/rental-detail.component';
import { RentalDetailModel } from '@features/rentals/model/rental-detail-model';
import { RentalEnumsResponse } from '@features/rentals/model/rental-enums-model';
import { CreateRentalRequest } from '@features/rentals/model/create-rental-request-model';
import { RentalCreatedModel } from '@features/rentals/model/rental-created-model';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  private readonly apiUrl: string = environment.apiUrl;
  
  private rentalEnums$?: Observable<RentalEnumsResponse>;

  constructor(private http: HttpClient) { }

  createRental(request: CreateRentalRequest): Observable<RentalCreatedModel> {
    return this.http.post<RentalDetailModel>(`${this.apiUrl}/rental`, request);
  }

  cancelRental(rentalId: string): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/rental/${rentalId}/cancel`, {});
  }

  getRentalDetail(rentalId: string): Observable<RentalDetailModel> {
    return this.http.get<RentalDetailModel>(`${this.apiUrl}/rental/find/${rentalId}`);
  }

  getRenting(page: number, size: number): Observable<PageResponse<RentalDisplayModel>> {
    const params = new HttpParams()
      .set("page", page)
      .set("size", size);

    return this.http.get<PageResponse<RentalDisplayModel>>(this.apiUrl + "/rental/find/rented", { params });

  }

  getRentingOut(page: number, size: number): Observable<PageResponse<RentalDisplayModel>> {
    const params = new HttpParams()
      .set("page", page)
      .set("size", size);

    return this.http.get<PageResponse<RentalDisplayModel>>(this.apiUrl + "/rental/find/userRentals", { params });

  }

  getRentalEnums(): Observable<RentalEnumsResponse> {
    if (!this.rentalEnums$) {
      this.rentalEnums$ = this.http
        .get<RentalEnumsResponse>(`${this.apiUrl}/rental/enums`)
        .pipe(
          shareReplay(1)
        );
    }

    return this.rentalEnums$;
  }
}
