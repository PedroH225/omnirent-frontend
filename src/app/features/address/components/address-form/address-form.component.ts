import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddressModel } from '@features/address/model/address-model';
import { AddressRequestModel } from '@features/address/model/address-request-model';
import { Button } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-address-form',
  imports: [
    FormsModule,
    Button,
    InputTextModule
  ],
  templateUrl: './address-form.component.html',
  styleUrl: './address-form.component.scss'
})
export class AddressFormComponent {

  @Input({ required: true })
  address!: AddressModel | undefined;

  @Output()
  save = new EventEmitter<AddressRequestModel>();

  @Output()
  cancel = new EventEmitter<void>();

  form: AddressRequestModel = this.createEmptyAddress();

  ngOnChanges() {
    if (this.address) {
      this.form = { ...this.address };
    } else {
      this.form = this.createEmptyAddress();
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


  onSave(): void {
    this.save.emit(this.form);
  }


  onCancel(): void {
    this.cancel.emit();
  }

}
