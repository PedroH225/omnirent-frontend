import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RentalService } from '@core/rental/rental.service';
import { MessageService } from 'primeng/api';
import { Button } from "primeng/button";

@Component({
  selector: 'app-request-return',
  imports: [Button],
  templateUrl: './request-return.component.html',
  styleUrl: './request-return.component.scss'
})
export class RequestReturnComponent {

  @Input() rentalId!: string;
  @Input() isOwner!: boolean;

  @Output() returnRequested = new EventEmitter<string>();

  constructor(
    private rentalService: RentalService,
    private messageService: MessageService
  ) { }

  requestReturn(): void {
    if (!this.rentalId || this.isOwner) {
      return;
    }

    this.rentalService.requestReturn(this.rentalId).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Return requested',
          detail: 'Your return request has been submitted successfully.'
        });

        this.returnRequested.emit('RETURN_REQUESTED');
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
      }
    });
  }
}