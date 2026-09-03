import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RentalService } from '@core/rental/rental.service';
import { MessageService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { Button } from 'primeng/button';
import { TranslatePipe } from '@core/i18n/translation-pipe';
import { TranslationService } from '@core/i18n/translation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prepare-item',
  imports: [ConfirmDialog, Button, TranslatePipe],
  templateUrl: './prepare-item.component.html',
  styleUrl: './prepare-item.component.scss',
})
export class PrepareItemComponent {
  @Input() rentalId!: string;
  @Input() isOwner = false;

  @Output() startedPreparing = new EventEmitter<string>();

  constructor(
    private rentalService: RentalService,
    private messageService: MessageService,
    private translationService: TranslationService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.router.navigate([], {
      queryParams: {},
      replaceUrl: true,
    });
  }

  startPreparing(): void {
    if (!this.rentalId || !this.isOwner) {
      return;
    }

    this.rentalService.startPreparing(this.rentalId).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: this.translationService.translate(
            'rental.actions.prepare_item.messages.success.title',
          ),
          detail: this.translationService.translate(
            'rental.actions.prepare_item.messages.success.message',
          ),
        });

        this.startedPreparing.emit('PREPARING');
      },

      error: (error: HttpErrorResponse) => {
        this.messageService.add({
          severity: 'error',
          summary: this.translationService.translate(
            'rental.actions.prepare_item.messages.error.title',
          ),
          detail:
            error.error?.message ??
            this.translationService.translate(
              'rental.actions.prepare_item.messages.error.default',
            ),
        });
      },
    });
  }
}
