import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslatePipe } from '@core/i18n/translation-pipe';
import { TranslationService } from '@core/i18n/translation.service';
import { RentalService } from '@core/rental/rental.service';
import { MessageService } from 'primeng/api';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-request-return',
  imports: [Button, TranslatePipe],
  templateUrl: './request-return.component.html',
  styleUrl: './request-return.component.scss',
})
export class RequestReturnComponent {
  @Input() rentalId!: string;
  @Input() isOwner!: boolean;

  @Output() returnRequested = new EventEmitter<string>();

  constructor(
    private rentalService: RentalService,
    private messageService: MessageService,
    private translationService: TranslationService,
  ) {}

  requestReturn(): void {
    if (!this.rentalId || this.isOwner) {
      return;
    }

    this.rentalService.requestReturn(this.rentalId).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: this.translationService.translate(
            'rental.actions.request_return.messages.success.title',
          ),
          detail: this.translationService.translate(
            'rental.actions.request_return.messages.success.message',
          ),
        });

        this.returnRequested.emit('RETURN_REQUESTED');
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);

        this.messageService.add({
          severity: 'error',
          summary: this.translationService.translate(
            'rental.actions.request_return.messages.error.title',
          ),
          detail: this.translationService.translate(
            'rental.actions.request_return.messages.error.default',
          ),
        });
      },
    });
  }
}
