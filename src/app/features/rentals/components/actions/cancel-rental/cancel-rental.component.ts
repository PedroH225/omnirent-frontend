import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { RentalService } from '@core/rental/rental.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Button } from "primeng/button";
import { ConfirmDialog } from "primeng/confirmdialog";

@Component({
  selector: 'app-cancel-rental',
  templateUrl: './cancel-rental.component.html',
  styleUrl: './cancel-rental.component.scss',
  providers: [ConfirmationService, MessageService],
  imports: [Button, ConfirmDialog]
})
export class CancelRentalComponent {

  @Input() rentalId!: string;
  @Input() rentalStatus!: string;
  @Input() isOwner = false;

  @Output() rentalCancelled = new EventEmitter<string>();

  constructor(
    private rentalService: RentalService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  cancelRental(): void {
    console.log("entro");

    if (!this.rentalId) {
      return;
    }
    console.log("aaaa");

    const isConfirmed = this.rentalStatus === 'CONFIRMED';

    const header = isConfirmed
      ? 'Confirm rental cancellation'
      : 'Cancel rental';

    const message = this.buildConfirmationMessage(isConfirmed);

    this.confirmationService.confirm({
      header,
      message,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: isConfirmed ? 'Cancel rental' : 'Cancel',
      rejectLabel: 'Keep rental',
      acceptButtonStyleClass: 'p-button-danger',


      accept: () => {
        this.executeCancellation();
      }
    });
  }

  private executeCancellation(): void {
    this.rentalService.cancelRental(this.rentalId).subscribe({
      next: () => {
        const isRefund = this.rentalStatus === 'CONFIRMED';

        this.messageService.add({
          severity: 'success',
          summary: isRefund
            ? 'Rental cancelled'
            : 'Rental cancelled',
          detail: this.buildSuccessMessage(isRefund)
        });

        this.rentalCancelled.emit("CANCELLED");
      },

      error: (error: HttpErrorResponse) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Cancellation failed',
          detail: error.error?.message ??
            'The rental could not be cancelled.'
        });
      }
    });
  }

  private buildConfirmationMessage(isRefund: boolean): string {

    if (isRefund) {
      if (this.isOwner) {
        return 'Cancelling this confirmed rental will initiate a refund to the renter. The refund may take up to 48 hours to be processed. Do you want to continue?';
      }

      return 'Cancelling this confirmed rental will initiate a refund. The refund may take up to 48 hours to be processed. Do you want to continue?';
    }

    if (this.isOwner) {
      return 'Are you sure you want to cancel this rental? The renter will no longer be able to proceed with the rental.';
    }

    return 'Are you sure you want to cancel this rental?';
  }

  private buildSuccessMessage(isRefund: boolean): string {

    if (isRefund) {
      if (this.isOwner) {
        return 'The rental was cancelled. A refund will be processed for the renter within 48 hours.';
      }

      return 'The rental was cancelled. Your refund will be processed within 48 hours.';
    }

    if (this.isOwner) {
      return 'The rental was cancelled successfully.';
    }

    return 'Your rental was cancelled successfully.';
  }
}