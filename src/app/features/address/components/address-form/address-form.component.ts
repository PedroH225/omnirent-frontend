import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddressModel } from '@features/address/model/address-model';
import { AddressRequestModel } from '@features/address/model/address-request-model';
import { Button } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FieldErrorComponent } from '@shared/components/field-error/field-error.component';
import { FieldError } from '@shared/models/field-error';
import { AddressFormValidator } from '@features/address/validators/address-form-validator';

@Component({
  selector: 'app-address-form',
  imports: [FormsModule, Button, InputTextModule, FieldErrorComponent],
  templateUrl: './address-form.component.html',
  styleUrl: './address-form.component.scss',
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

  form: AddressRequestModel = this.createEmptyAddress();

  localErrors: FieldError[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['address']) {
      if (this.address) {
        this.form = { ...this.address };
      } else {
        this.form = this.createEmptyAddress();
      }

      this.localErrors = [];
    }
  }

  onFieldChange(field: string): void {
    this.localErrors = this.localErrors.filter(
      (error) => error.field !== field,
    );

    this.backendErrors = this.backendErrors.filter(
      (error) => error.field !== field,
    );

    this.fieldChange.emit(field);
  }

  getFieldError(field: string): string | undefined {
    return (
      this.localErrors.find((error) => error.field === field)?.message ??
      this.backendErrors.find((error) => error.field === field)?.message
    );
  }

  onSave(): void {
    this.localErrors = AddressFormValidator.validate(this.form);

    if (this.localErrors.length > 0) {
      return;
    }

    this.save.emit(this.form);
  }

  onCancel(): void {
    this.cancel.emit();
  }

  private createEmptyAddress(): AddressRequestModel {
    return {
      id: '',
      street: '',
      number: '',
      complement: null,
      district: '',
      city: '',
      state: '',
      country: 'Brazil',
      zipCode: '',
    };
  }
}
