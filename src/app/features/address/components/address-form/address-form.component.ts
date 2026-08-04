import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddressModel } from '@features/address/model/address-model';
import { AddressRequestModel } from '@features/address/model/address-request-model';
import { Button } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FieldErrorComponent } from "@shared/components/field-error/field-error.component";
import { FieldError } from '@shared/models/field-error';

@Component({
  selector: 'app-address-form',
  imports: [
    FormsModule,
    Button,
    InputTextModule,
    FieldErrorComponent
  ],
  templateUrl: './address-form.component.html',
  styleUrl: './address-form.component.scss'
})
export class AddressFormComponent {

  @Input()
  backendErrors: FieldError[] = [];

  @Input({ required: true })
  address!: AddressModel | undefined;

  @Output()
  save = new EventEmitter<AddressRequestModel>();

  @Output()
  cancel = new EventEmitter<void>();

  @Output()
  fieldChange = new EventEmitter<string>();

  onFieldChange(field: string) {
    this.fieldChange.emit(field);
  }

  form: AddressRequestModel = this.createEmptyAddress();

  ngOnChanges(changes: SimpleChanges) {
    if (changes['address']) {

      if (this.address) {
        this.form = { ...this.address };
      } else {
        this.form = this.createEmptyAddress();
      }
    }
  }

  createEmptyAddress(): AddressRequestModel {
    return {
      id: '',
      street: '',
      number: '',
      complement: null,
      district: '',
      city: '',
      state: '',
      country: 'Brazil',
      zipCode: ''
    };
  }

  getFieldError(field: string): string | undefined {
    return this.backendErrors.find(
      error => error.field === field
    )?.message;
  }

  onSave(): void {
    this.save.emit(this.form);
  }


  onCancel(): void {
    this.cancel.emit();
  }

}
