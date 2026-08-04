import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddressModel } from '@features/address/model/address-model';
import { AddressRequestModel } from '@features/address/model/address-request-model';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private readonly apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUserAddresses(): Observable<AddressModel[]> {
    return this.http.get<AddressModel[]>(`${this.apiUrl}/address/user`);
  }

  deleteAddress(addressId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/address/${addressId}`);
  }

  addAddress(newAddress: AddressRequestModel): Observable<AddressModel> {
    return this.http.post<AddressModel>(`${this.apiUrl}/address`, newAddress);
  }

  updateAddress(updatedAddress: AddressRequestModel): Observable<AddressModel> {
    return this.http.put<AddressModel>(`${this.apiUrl}/address`, updatedAddress);
  }
}
