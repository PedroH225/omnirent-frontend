import { Component } from '@angular/core';
import { AddressService } from '@core/address/address.service';
import { AddressModel } from '../model/address-model';
import { Button } from 'primeng/button';
import { AddressCardComponent } from '../components/address-card/address-card.component';
import { CommonModule } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Dialog } from 'primeng/dialog';
import { AddressFormComponent } from '../components/address-form/address-form.component';
import { AddressRequestModel } from '../model/address-request-model';
import { ToastModule } from 'primeng/toast';
import { FieldError } from '@shared/models/field-error';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiValidationException } from '@shared/models/api-field-exception';
import { finalize } from 'rxjs';
import { TranslatePipe } from '@core/i18n/translation-pipe';
import { TranslationService } from '@core/i18n/translation.service';

@Component({
  selector: 'app-user-address',
  imports: [
    CommonModule,
    Button,
    ConfirmDialogModule,
    AddressCardComponent,
    Dialog,
    AddressFormComponent,
    ToastModule,
    TranslatePipe,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './user-address.component.html',
  styleUrl: './user-address.component.scss',
})
export class UserAddressComponent {
  loading = true;
  backendErrors: FieldError[] = [];
  displayForm: boolean = false;

  selectedAddress: AddressModel | undefined;

  addresses: AddressModel[] = [];

  constructor(
    private addressService: AddressService,
    private messageService: MessageService,
    private translationService: TranslationService
  ) {}

  ngOnInit(): void {
    this.loadUserAddresses();
  }

  openEdit($event: AddressModel) {
    this.selectedAddress = $event;
    this.displayForm = true;
  }

  openCreate() {
    this.selectedAddress = undefined;
    this.displayForm = true;
  }

  loadUserAddresses(): void {
    this.loading = true;

    this.addressService
      .getUserAddresses()
      .pipe(
        finalize(() => {
          this.loading = false;
        }),
      )
      .subscribe({
        next: (addresses) => {
          this.addresses = addresses;
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  saveAddress(address: AddressRequestModel) {
    const original = this.addresses.find((item) => item.id === address.id);

    if (original && this.isSameAddress(original, address)) {
      this.displayForm = false;
      return;
    }

    if (address.id) {
      this.updateAddress(address);

      return;
    }

    this.addAddress(address);
  }

  addAddress(address: AddressRequestModel) {
    this.addressService.addAddress(address).subscribe({
      next: (newAddress) => {
        this.addresses.push(newAddress);
        this.displayForm = false;

        this.messageService.add({
          severity: 'success',
          summary: this.translationService.translate('common.messages.success'),
          detail: this.translationService.translate('account.addresses.messages.added'),
        });

        this.backendErrors = [];
      },
      error: (error: HttpErrorResponse) => {
        const validationException = error.error as ApiValidationException;
        if (validationException?.errorCode == 'VALIDATION_ERROR') {
          this.backendErrors = validationException.fields;
        }
        console.error(error);
      },
    });
  }

  updateAddress(address: AddressRequestModel) {
    this.addressService.updateAddress(address).subscribe({
      next: (updatedAddress) => {
        const index = this.addresses.findIndex(
          (item) => item.id === updatedAddress.id,
        );

        if (index !== -1) {
          this.addresses[index] = updatedAddress;
        }

        this.displayForm = false;

        this.messageService.add({
          severity: 'success',
          summary: this.translationService.translate('common.messages.success'),
          detail: this.translationService.translate('account.addresses.messages.updated'),
        });

        this.backendErrors = [];
      },
      error: (error: HttpErrorResponse) => {
        const validationException = error.error as ApiValidationException;
        if (validationException?.errorCode == 'VALIDATION_ERROR') {
          this.backendErrors = validationException.fields;
        }
        console.error(error);
      },
    });
  }

  deleteAddress(addressId: string): void {
    this.addressService.deleteAddress(addressId).subscribe({
      next: () => {
        this.addresses = this.addresses.filter(
          (address) => address.id !== addressId,
        );
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  onCancel() {
    this.displayForm = false;
    this.backendErrors = [];
    this.selectedAddress = undefined;
  }

  clearBackendError(field: string) {
    this.backendErrors = this.backendErrors.filter(
      (error) => error.field !== field,
    );
  }

  isSameAddress(a: AddressModel, b: AddressRequestModel): boolean {
    return (
      a.street === b.street &&
      a.number === b.number &&
      a.complement === b.complement &&
      a.district === b.district &&
      a.city === b.city &&
      a.state === b.state &&
      a.country === b.country &&
      a.zipCode === b.zipCode
    );
  }
}
