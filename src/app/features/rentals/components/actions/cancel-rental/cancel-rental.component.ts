import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { RentalService } from '@core/rental/rental.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Button } from 'primeng/button';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { TranslatePipe } from '@core/i18n/translation-pipe';
import { TranslationService } from '@core/i18n/translation.service';
import { Toast } from "primeng/toast";

@Component({
  selector: 'app-cancel-rental',
  templateUrl: './cancel-rental.component.html',
  styleUrl: './cancel-rental.component.scss',
  providers: [ConfirmationService],
  imports: [Button, ConfirmDialog, TranslatePipe],
})
export class CancelRentalComponent {
  @Input() rentalId!: string;
  @Input() rentalStatus!: string;
  @Input() isOwner = false;

  @Output() rentalCancelled = new EventEmitter<string>();

  constructor(
    private rentalService: RentalService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private translationService: TranslationService,
  ) {}

  cancelRental(): void {
    if (!this.rentalId) {
      return;
    }

    const isConfirmed = this.rentalStatus === 'CONFIRMED';

    const headerKey = this.isOwner
      ? isConfirmed
        ? 'rental.actions.cancel_rental.confirmation.confirmed.owner.header'
        : 'rental.actions.cancel_rental.confirmation.pending.owner.header'
      : isConfirmed
        ? 'rental.actions.cancel_rental.confirmation.confirmed.renter.header'
        : 'rental.actions.cancel_rental.confirmation.pending.renter.header';

    this.confirmationService.confirm({
      header: this.translationService.translate(headerKey),
      message: this.translationService.translate(
        this.buildConfirmationMessage(isConfirmed),
      ),
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: this.translationService.translate(
        isConfirmed
          ? 'rental.actions.cancel_rental.confirmation.confirmed.accept'
          : 'rental.actions.cancel_rental.confirmation.pending.accept',
      ),
      rejectLabel: this.translationService.translate(
        isConfirmed
          ? 'rental.actions.cancel_rental.confirmation.confirmed.reject'
          : 'rental.actions.cancel_rental.confirmation.pending.reject',
      ),
      acceptButtonStyleClass: 'p-button-danger',

      accept: () => {
        this.executeCancellation();
      },
    });
  }

  private buildConfirmationMessage(isRefund: boolean): string {
    if (isRefund) {
      if (this.isOwner) {
        return 'rental.actions.cancel_rental.confirmation.confirmed.owner.message';
      }

      return 'rental.actions.cancel_rental.confirmation.confirmed.renter.message';
    }

    if (this.isOwner) {
      return 'rental.actions.cancel_rental.confirmation.pending.owner.message';
    }

    return 'rental.actions.cancel_rental.confirmation.pending.renter.message';
  }

  private executeCancellation(): void {
    this.rentalService.cancelRental(this.rentalId).subscribe({
      next: () => {
        const isRefund = this.rentalStatus === 'CONFIRMED';

        this.messageService.add({
          severity: 'success',
          summary: this.translationService.translate(
            'rental.actions.cancel_rental.messages.success.title',
          ),
          detail: this.translationService.translate(
            this.buildSuccessMessage(isRefund),
          ),
        });

        this.rentalCancelled.emit('CANCELLED');
      },

      error: (error: HttpErrorResponse) => {
        this.messageService.add({
          severity: 'error',
          summary: this.translationService.translate(
            'rental.actions.cancel_rental.messages.error.title',
          ),
          detail:
            error.error?.message ??
            this.translationService.translate(
              'rental.actions.cancel_rental.messages.error.default',
            ),
        });
      },
    });
  }

  private buildSuccessMessage(isRefund: boolean): string {
    if (isRefund) {
      if (this.isOwner) {
        return 'rental.actions.cancel_rental.messages.success.owner.refunded';
      }

      return 'rental.actions.cancel_rental.messages.success.renter.refunded';
    }

    if (this.isOwner) {
      return 'rental.actions.cancel_rental.messages.success.owner.cancelled';
    }

    return 'rental.actions.cancel_rental.messages.success.renter.cancelled';
  }
}
