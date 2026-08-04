import { Component } from '@angular/core';
import { AddressService } from '@core/address/address.service';
import { AddressModel } from '../model/address-model';
import { Button } from "primeng/button";
import { AddressCardComponent } from "../components/address-card/address-card.component";
import { CommonModule } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-user-address',
  imports: [CommonModule, Button, ConfirmDialogModule, AddressCardComponent],
  providers: [
    ConfirmationService
  ],
  templateUrl: './user-address.component.html',
  styleUrl: './user-address.component.scss'
})
export class UserAddressComponent {

  addresses: AddressModel[] = [];

  constructor(private addressService: AddressService) { }

  ngOnInit(): void {
    this.loadUserAddresses();
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