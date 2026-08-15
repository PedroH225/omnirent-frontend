import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { PaymentCheckout } from './model/payment-checkout-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private readonly apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  findCheckout(rentalId: string): Observable<PaymentCheckout> {
    return this.http.get<PaymentCheckout>(`${this.apiUrl}/payment/checkout/rental/${rentalId}`);
  }
}
