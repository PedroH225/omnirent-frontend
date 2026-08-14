import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageResponse } from '../../shared/models/page.response.model';
import { RentalDisplayModel } from '@features/rentals/model/rental-display-model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { RentalDetailComponent } from '@features/rentals/rental-detail/rental-detail.component';
import { RentalDetailModel } from '@features/rentals/model/rental-detail-model';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  private readonly apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

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
}
