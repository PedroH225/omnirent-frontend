import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslatePipe } from '@core/i18n/translation-pipe';
import { PaymentCheckout } from '@core/payment/model/payment-checkout-model';
import { PaymentWebSocketService } from '@core/payment/payment-websocket.service';
import { PaymentService } from '@core/payment/payment.service';
import { ApiException } from '@shared/models/api-exception';
import { Button } from 'primeng/button';
import { PopoverModule } from 'primeng/popover';
import { retry, timer } from 'rxjs';

@Component({
  selector: 'app-confirm-rental',
  imports: [Button, PopoverModule, TranslatePipe],
  templateUrl: './confirm-rental.component.html',
  styleUrl: './confirm-rental.component.scss',
})
export class ConfirmRentalComponent {
  protected readonly Math = Math;

  @Input() rentalId!: string;
  @Input() isOwner = false;

  @Output() paymentExpired = new EventEmitter<string>();
  @Output() paymentConfirmed = new EventEmitter<string>();
  @Output() canCancel = new EventEmitter<boolean>();

  paymentCheckout: PaymentCheckout | undefined;

  paymentStatus: string = 'PREPARING_PAYMENT';
  private readonly PROCESSING_RETRY_LIMIT = 5;
  private readonly PROCESSING_RETRY_DELAY = 2000;
  remainingSeconds = 0;

  private paymentTimer?: ReturnType<typeof setInterval>;

  constructor(
    private paymentService: PaymentService,
    private paymentWebSocketService: PaymentWebSocketService,
  ) {}

  ngOnInit() {
    this.paymentWebSocketService.connect(this.rentalId, (response) =>
      this.handlePaymentEvent(response),
    );

    this.paymentWebSocketService.connectPaymentUpdate(this.rentalId, () =>
      this.handlePaymentUpdate(),
    );

    const sucess = new URLSearchParams(window.location.search).get('success');

    if (sucess === 'true') {
      this.paymentStatus = 'PROCESSING_PAYMENT';
      this.canCancel.emit(false);
    }

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
    if (this.paymentStatus === 'ERROR') {
      this.paymentStatus = 'PREPARING_PAYMENT';
    }

    if (!this.rentalId) {
      return;
    }

    this.findCheckout();
  }

  private findCheckout(processingAttempt = 0): void {
    this.paymentService
      .findCheckout(this.rentalId)
      .pipe(
        retry({
          count: 3,
          delay: (error: HttpErrorResponse, retryCount) => {
            const apiException = error.error as ApiException;

            if (apiException?.errorCode !== 'PAYMENT_NOT_FOUND') {
              throw error;
            }

            return timer(retryCount * 2000);
          },
        }),
      )
      .subscribe({
        next: (response) => {
          if (response.status === 'PAID') {
            this.handleCheckout(response);
            return;
          }

          if (response.status !== 'PENDING') {
            return;
          }

          this.handleCheckout(response);

          if (
            this.paymentStatus === 'PROCESSING_PAYMENT' &&
            processingAttempt < this.PROCESSING_RETRY_LIMIT
          ) {
            timer(this.PROCESSING_RETRY_DELAY).subscribe(() => {
              this.findCheckout(processingAttempt + 1);
            });
          }
        },
        error: () => {
          this.paymentStatus = 'ERROR';
        },
      });
  }

  private handlePaymentUpdate() {    
    this.canCancel.emit(true);
    this.paymentConfirmed.emit('CONFIRMED');
  }

  private handlePaymentEvent(event: PaymentCheckout): void {
    if (event.status !== 'PENDING') {
      return;
    }

    this.handleCheckout(event);

    this.paymentWebSocketService.disconnect();
  }

  private handleCheckout(checkout: PaymentCheckout): void {
    if (checkout.status === 'PAID') {      
      this.handlePaymentUpdate();
      return;
    }

    this.paymentCheckout = checkout;

    if (this.paymentStatus === 'PROCESSING_PAYMENT') {
      return;
    }

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
      const remaining = Math.max(0, expirationTime - Date.now());

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
