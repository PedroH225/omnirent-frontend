import { Component, Input } from '@angular/core';
import { AddressModel } from '@features/address/model/address-model';
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

}
