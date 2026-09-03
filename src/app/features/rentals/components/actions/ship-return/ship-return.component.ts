import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslatePipe } from '@core/i18n/translation-pipe';
import { TranslationService } from '@core/i18n/translation.service';
import { RentalService } from '@core/rental/rental.service';
import { MessageService } from 'primeng/api';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-ship-return',
  imports: [Button, TranslatePipe],
  templateUrl: './ship-return.component.html',
  styleUrl: './ship-return.component.scss',
})
export class ShipReturnComponent {
  @Input() rentalId!: string;
  @Input() isOwner!: boolean;

  @Output() returnShipped = new EventEmitter<string>();

  constructor(
    private rentalService: RentalService,
    private messageService: MessageService,
    private translationService: TranslationService,
  ) {}

  shipReturn(): void {
    if (!this.rentalId || this.isOwner) {
      return;
    }

    this.rentalService.shipReturnRental(this.rentalId).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: this.translationService.translate(
            'rental.actions.ship_return.messages.success.title',
          ),
          detail: this.translationService.translate(
            'rental.actions.ship_return.messages.success.message',
          ),
        });

        this.returnShipped.emit('RETURN_SHIPPED');
      },

      error: (error: HttpErrorResponse) => {
        console.error(error);

        this.messageService.add({
          severity: 'error',
          summary: this.translationService.translate(
            'rental.actions.ship_return.messages.error.title',
          ),
          detail: this.translationService.translate(
            'rental.actions.ship_return.messages.error.default',
          ),
        });
      },
    });
  }
}
