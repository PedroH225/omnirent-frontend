import { Component } from '@angular/core';
import { AddressService } from '@core/address/address.service';
import { AddressModel } from '../model/address-model';
import { Button } from "primeng/button";
import { AddressCardComponent } from "../components/address-card/address-card.component";
import { CommonModule } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { Dialog } from "primeng/dialog";
import { AddressFormComponent } from "../components/address-form/address-form.component";
import { AddressRequestModel } from '../model/address-request-model';

@Component({
  selector: 'app-user-address',
  imports: [CommonModule, Button, ConfirmDialogModule, AddressCardComponent, Dialog, AddressFormComponent],
  providers: [
    ConfirmationService
  ],
  templateUrl: './user-address.component.html',
  styleUrl: './user-address.component.scss'
})
export class UserAddressComponent {
  displayForm: boolean = false;

  selectedAddress: AddressModel | undefined;

  addresses: AddressModel[] = [];

  constructor(private addressService: AddressService) { }

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
    this.addressService.getUserAddresses().subscribe({
      next: (addresses) => {
        this.addresses = addresses;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

saveAddress(address: AddressRequestModel) {

  if (address.id) {

    this.addressService.updateAddress(address).subscribe({
      next: (updatedAddress) => {
        const index = this.addresses.findIndex(
          item => item.id === updatedAddress.id
        );

        if (index !== -1) {
          this.addresses[index] = updatedAddress;
        }

        this.displayForm = false;
      },
      error: (error) => {
        console.error(error);
      }
    });

    return;
  }


  this.addressService.addAddress(address).subscribe({
    next: (newAddress) => {
      this.addresses.push(newAddress);
      this.displayForm = false;
    },
    error: (error) => {
      console.error(error);
    }
  });

}

  deleteAddress(addressId: string): void {
    this.addressService.deleteAddress(addressId).subscribe({
      next: () => {
        this.addresses = this.addresses.filter(
          address => address.id !== addressId
        );
      },
      error: error => {
        console.error(error);
      }
    });

  }
}