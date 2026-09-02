import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslatePipe } from '@core/i18n/translation-pipe';
import { TranslationService } from '@core/i18n/translation.service';
import { RentalService } from '@core/rental/rental.service';
import { RentalOperationalModel } from '@features/rentals/model/rental-operational-model ';
import { MessageService } from 'primeng/api';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-mark-returned',
  imports: [Button, CommonModule, TranslatePipe],
  templateUrl: './mark-returned.component.html',
  styleUrl: './mark-returned.component.scss',
})
export class MarkReturnedComponent {
  @Input() rentalId!: string;

  @Input() isOwner!: boolean;

  rentalOp!: RentalOperationalModel;

  @Output() returned = new EventEmitter<string>();

  constructor(
    private rentalService: RentalService,
    private messageService: MessageService,
    private translationService: TranslationService,
  ) {}

  ngOnInit(): void {
    this.loadOperationalData();
  }

  loadOperationalData(): void {
    if (!this.rentalId) {
      return;
    }

    this.rentalService.getOperationalData(this.rentalId).subscribe({
      next: (response) => {
        this.rentalOp = response;
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
      },
    });
  }

  getEstimatedReturn(): Date | null {
    if (!this.rentalOp?.updatedAt) {
      return null;
    }

    return new Date(
      new Date(this.rentalOp.updatedAt).getTime() + 60 * 60 * 1000,
    );
  }

  confirmReturn(): void {
    if (!this.rentalId || !this.isOwner) {
      return;
    }

    this.rentalService.confirmReturn(this.rentalId).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: this.translationService.translate(
            'rental.actions.mark_returned.messages.success.title',
          ),
          detail: this.translationService.translate(
            'rental.actions.mark_returned.messages.success.message',
          ),
        });

        this.returned.emit('RETURNED');
      },

      error: (error: HttpErrorResponse) => {
        console.error(error);

        this.messageService.add({
          severity: 'error',
          summary: this.translationService.translate(
            'rental.actions.mark_returned.messages.error.title',
          ),
          detail: this.translationService.translate(
            'rental.actions.mark_returned.messages.error.default',
          ),
        });
      },
    });
  }

  simulateReturn(): void {
    if (!this.rentalId) {
      return;
    }

    this.rentalService.confirmReturn(this.rentalId).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Return simulated',
          detail: 'The return has been simulated successfully.',
        });

        this.returned.emit('RETURNED');
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);

        this.messageService.add({
          severity: 'error',
          summary: 'Simulation failed',
          detail: 'The return could not be simulated.',
        });
      },
    });
  }
}
