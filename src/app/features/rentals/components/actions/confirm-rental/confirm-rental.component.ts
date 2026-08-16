import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  protected readonly Math = Math;

  @Input() rentalId!: string;
  @Input() isOwner = false;
  
  @Output() paymentExpired = new EventEmitter<string>();
  paymentCheckout: PaymentCheckout | undefined;

  paymentStatus: string = 'PREPARING_PAYMENT';

  remainingSeconds = 0;

  private paymentTimer?: ReturnType<typeof setInterval>;

  constructor(private paymentService: PaymentService, private paymentWebSocketService: PaymentWebSocketService) { }

  ngOnInit() {
    this.preparePayment();
  }

  ngOnDestroy(): void {
    if (this.paymentTimer) {
      clearInterval(this.paymentTimer);
    }
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
        this.handleCheckout(response);
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

  private handlePaymentEvent(event: PaymentCheckout): void {
    if (event.status !== 'PENDING') {
      return;
    }

    this.handleCheckout(event);

    this.paymentWebSocketService.disconnect();
  }


  private handleCheckout(checkout: PaymentCheckout): void {
    this.paymentCheckout = checkout;
    this.paymentStatus = 'PENDING';

    this.startPaymentTimer(checkout.now);
  }

  private startPaymentTimer(createdAt: string): void {
    if (this.paymentTimer) {
      clearInterval(this.paymentTimer);
    }

    const createdTime = new Date(createdAt).getTime();
    const expirationTime = createdTime + 30 * 60 * 1000;

    const updateTimer = () => {
      const remaining = Math.max(
        0,
        expirationTime - Date.now()
      );

      this.remainingSeconds = Math.ceil(remaining / 1000);

      if (remaining <= 0) {
        clearInterval(this.paymentTimer);
        this.paymentTimer = undefined;

        this.paymentStatus = 'EXPIRED';
        this.paymentExpired.emit('EXPIRED');
      }
    };

    updateTimer();

    this.paymentTimer = setInterval(updateTimer, 1000);
  }
}
