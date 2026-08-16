import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RentalService } from '@core/rental/rental.service';
import { MessageService } from 'primeng/api';
import { ConfirmDialog } from "primeng/confirmdialog";
import { Button } from "primeng/button";

@Component({
  selector: 'app-prepare-item',
  imports: [ConfirmDialog, Button],
  templateUrl: './prepare-item.component.html',
  styleUrl: './prepare-item.component.scss'
})
export class PrepareItemComponent {

  @Input() rentalId!: string;
  @Input() isOwner = false;

  @Output() startedPreparing = new EventEmitter<string>();

  constructor(
    private rentalService: RentalService,
    private messageService: MessageService
  ) { }

  startPreparing(): void {
    if (!this.rentalId || !this.isOwner) {
      return;
    }

    this.rentalService.startPreparing(this.rentalId).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Preparation started',
          detail: 'The rental item is now being prepared.'
        });

        this.startedPreparing.emit('PREPARING');
      },

      error: (error: HttpErrorResponse) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Unable to start preparation',
          detail: error.error?.message ?? 'The item could not be prepared.'
        });
      }
    });
  }
}