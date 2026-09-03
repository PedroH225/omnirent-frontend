import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaymentCheckout } from '@core/payment/model/payment-checkout-model';
import { PaymentService } from '@core/payment/payment.service';
import { ApiException } from '@shared/models/api-exception';
import { Button } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { TranslatePipe } from '@core/i18n/translation-pipe';
import { TranslationService } from '@core/i18n/translation.service';
import { PaymentWebSocketService } from '@core/payment/payment-websocket.service';

@Component({
  selector: 'app-late-rental',
  imports: [Button, TranslatePipe],
  templateUrl: './late-rental.component.html',
  styleUrl: './late-rental.component.scss',
})
export class LateRentalComponent {
  paymentStatus = '';

  @Input() rentalId!: string;
  @Input() isOwner = false;

  @Output() rentalRenewed = new EventEmitter<void>();

  paymentCheckout: PaymentCheckout | undefined;

  loading = false;

  constructor(
    private paymentService: PaymentService,
    private messageService: MessageService,
    private translationService: TranslationService,
    private paymentWebSocketService: PaymentWebSocketService,
  ) {}

  ngOnInit(): void {
    this.paymentWebSocketService.connectPaymentUpdate(this.rentalId, () =>
      this.handlePaymentUpdate(),
    );

    const success = new URLSearchParams(window.location.search).get('success');

    if (success === 'true') {
      this.paymentStatus = 'PROCESSING_PAYMENT';
      return;
    }

    this.preparePayment();
  }

  preparePayment(): void {
    if (!this.rentalId || this.isOwner) {
      return;
    }

    this.paymentService.findCheckout(this.rentalId).subscribe({
      next: (response) => {
        this.paymentCheckout = response;
      },

      error: (error: HttpErrorResponse) => {
        const apiException = error.error as ApiException;

        if (apiException?.errorCode === 'PAYMENT_NOT_FOUND') {
          this.paymentCheckout = undefined;
          return;
        }

        console.error(error);

        this.messageService.add({
          severity: 'error',
          summary: this.translationService.translate(
            'rental.actions.late_rental.messages.error.title',
          ),
          detail: this.translationService.translate(
            'rental.actions.late_rental.messages.error.renewalPayment',
          ),
        });
      },
    });
  }

  goToPayment(): void {
    if (!this.paymentCheckout?.checkoutUrl) {
      return;
    }

    window.location.href = this.paymentCheckout.checkoutUrl;
  }

  private handlePaymentUpdate() {    
    this.rentalRenewed.emit();
  }
}
