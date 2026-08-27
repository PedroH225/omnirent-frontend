import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslatePipe } from '@core/i18n/translation-pipe';
import { TranslationService } from '@core/i18n/translation.service';
import { AddressModel } from '@features/address/model/address-model';
import { ConfirmationService } from 'primeng/api';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-address-card',
  imports: [CommonModule, Button, TranslatePipe],
  templateUrl: './address-card.component.html',
  styleUrl: './address-card.component.scss',
})
export class AddressCardComponent {
  @Input({ required: true })
  address!: AddressModel;

  @Input()
  showActions = true;

  @Input()
  selected = false;

  @Input()
  selectable = false;

  @Output()
  delete = new EventEmitter<string>();

  @Output()
  edit = new EventEmitter<AddressModel>();

  @Output()
  select = new EventEmitter<AddressModel>();

  constructor(
    private confirmationService: ConfirmationService,
    private translationService: TranslationService,
  ) {}

  onDelete(): void {
    this.confirmationService.confirm({
      message: this.translationService.translate(
        'account.addresses.messages.confirmDelete.message',
      ),
      header: this.translationService.translate(
        'account.addresses.messages.confirmDelete.title',
      ),
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: this.translationService.translate('common.delete'),
      rejectLabel: this.translationService.translate('common.cancel'),
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.delete.emit(this.address.id);
      },
    });
  }

  onSelect(): void {
    if (this.selectable) {
      this.select.emit(this.address);
    }
  }

  onEdit(): void {
    this.edit.emit(this.address);
  }
}
