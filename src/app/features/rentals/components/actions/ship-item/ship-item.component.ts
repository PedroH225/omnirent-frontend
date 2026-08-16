import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RentalService } from '@core/rental/rental.service';
import { MessageService } from 'primeng/api';
import { Button } from "primeng/button";

@Component({
  selector: 'app-ship-item',
  imports: [Button],
  templateUrl: './ship-item.component.html',
  styleUrl: './ship-item.component.scss'
})
export class ShipItemComponent {

  @Input() rentalId!: string;
  @Input() isOwner!: boolean;

  @Output() itemShipped = new EventEmitter<string>();

  constructor(
    private rentalService: RentalService,
    private messageService: MessageService
  ) { }

  startPreparing(): void {
    if (!this.rentalId || !this.isOwner) {
      return;
    }

    this.rentalService.shipRental(this.rentalId).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Item shipped',
          detail: 'The item has been marked as shipped successfully.'
        });

        this.itemShipped.emit('SHIPPED');
      },

      error: (error: HttpErrorResponse) => {
        let detail = 'The item could not be marked as shipped.';

        if (error.error?.errorCode === 'INVALID_RENTAL_STATUS') {
          detail = 'The item cannot be shipped in its current rental status.';
        }

        this.messageService.add({
          severity: 'error',
          summary: 'Shipping failed',
          detail
        });
      }
    });
  }
}