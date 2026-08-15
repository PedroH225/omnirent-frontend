import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { PaymentCheckout } from '@core/payment/model/payment-checkout-model';
import { PaymentWebSocketService } from '@core/payment/payment-websocket.service';
import { PaymentService } from '@core/payment/payment.service';
import { ApiException } from '@shared/models/api-exception';
import { Button } from "primeng/button";
import { PopoverModule } from 'primeng/popover';

@Component({
  selector: 'app-confirm-rental',
  imports: [Button, PopoverModule],
  templateUrl: './confirm-rental.component.html',
  styleUrl: './confirm-rental.component.scss'
})
export class ConfirmRentalComponent {
  @Input() rentalId!: string;
  paymentCheckout: PaymentCheckout | undefined;

  paymentStatus: string = 'PREPARING_PAYMENT';

  constructor(private paymentService: PaymentService, private paymentWebSocketService: PaymentWebSocketService) { }

  ngOnInit() {
    this.preparePayment();
  }

  ngOnDestroy(): void {
    this.paymentWebSocketService.disconnect();
  }

  goToPayment(): void {

    if (!this.paymentCheckout?.checkoutUrl) {
      return;
    }

    window.location.href = this.paymentCheckout.checkoutUrl;
  }

  preparePayment(): void {

    if (!this.rentalId) {
      return;
    }

    this.paymentService.findCheckout(this.rentalId).subscribe({

      next: response => {
        this.paymentCheckout = response;
        this.paymentStatus = response.status;
      },

      error: (error: HttpErrorResponse) => {

        const apiException = error.error as ApiException;

        if (apiException?.errorCode === 'PAYMENT_NOT_FOUND') {

          this.paymentStatus = 'PREPARING_PAYMENT';

          this.paymentWebSocketService.connect(
            this.rentalId,
            response => this.handlePaymentEvent(response)
          );

          return;
        }

        this.paymentStatus = 'ERROR';
      }

    });
  }

  private handlePaymentEvent(event: any): void {

    this.paymentCheckout = event;
    this.paymentStatus = 'PENDING';

    this.paymentWebSocketService.disconnect();
  }

}
