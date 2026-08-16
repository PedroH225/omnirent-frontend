import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RentalService } from '@core/rental/rental.service';
import { MessageService } from 'primeng/api';
import { Button } from "primeng/button";

@Component({
  selector: 'app-ship-return',
  imports: [Button],
  templateUrl: './ship-return.component.html',
  styleUrl: './ship-return.component.scss'
})
export class ShipReturnComponent {

  @Input() rentalId!: string;
  @Input() isOwner!: boolean;

  @Output() returnShipped = new EventEmitter<string>();

  constructor(
    private rentalService: RentalService,
    private messageService: MessageService
  ) { }

  shipReturn(): void {
    if (!this.rentalId || this.isOwner) {
      return;
    }

    this.rentalService.shipReturnRental(this.rentalId).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Return shipped',
          detail: 'The return has been shipped successfully.'
        });

        this.returnShipped.emit('RETURN_SHIPPED');
      },

      error: (error: HttpErrorResponse) => {
        console.error(error);

        this.messageService.add({
          severity: 'error',
          summary: 'Return failed',
          detail: 'The return could not be shipped. Please try again.'
        });
      }
    });
  }
}
