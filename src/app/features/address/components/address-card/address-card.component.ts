import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AddressModel } from '@features/address/model/address-model';
import { ConfirmationService } from 'primeng/api';
import { Button } from "primeng/button";

@Component({
  selector: 'app-address-card',
  imports: [Button],
  templateUrl: './address-card.component.html',
  styleUrl: './address-card.component.scss'
})
export class AddressCardComponent {

  @Input({ required: true })
  address!: AddressModel;

  @Output()
  delete = new EventEmitter<string>();

  @Output()
  edit = new EventEmitter<AddressModel>();

  constructor(private confirmationService: ConfirmationService) { }

  onDelete(): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this address?',
      header: 'Delete Address',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Delete',
      rejectLabel: 'Cancel',
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.delete.emit(this.address.id);
      }
    });
  }

  onEdit(): void {
    this.edit.emit(this.address);
  }
}
