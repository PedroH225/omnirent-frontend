import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslatePipe } from '@core/i18n/translation-pipe';
import { TranslationService } from '@core/i18n/translation.service';
import { RentalService } from '@core/rental/rental.service';
import { MessageService } from 'primeng/api';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-ship-item',
  imports: [Button, TranslatePipe],
  templateUrl: './ship-item.component.html',
  styleUrl: './ship-item.component.scss',
})
export class ShipItemComponent {
  @Input() rentalId!: string;
  @Input() isOwner!: boolean;

  @Output() itemShipped = new EventEmitter<string>();

  constructor(
    private rentalService: RentalService,
    private messageService: MessageService,
    private translationService: TranslationService,
  ) {}

  startPreparing(): void {
    if (!this.rentalId || !this.isOwner) {
      return;
    }

    this.rentalService.shipRental(this.rentalId).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: this.translationService.translate(
            'rental.actions.ship_item.messages.success.title',
          ),
          detail: this.translationService.translate(
            'rental.actions.ship_item.messages.success.message',
          ),
        });

        this.itemShipped.emit('SHIPPED');
      },

      error: (error: HttpErrorResponse) => {
        const detail =
          error.error?.errorCode === 'INVALID_RENTAL_STATUS'
            ? this.translationService.translate(
                'rental.actions.ship_item.messages.error.invalidRentalStatus',
              )
            : this.translationService.translate(
                'rental.actions.ship_item.messages.error.default',
              );

        this.messageService.add({
          severity: 'error',
          summary: this.translationService.translate(
            'rental.actions.ship_item.messages.error.title',
          ),
          detail,
        });
      },
    });
  }
}
