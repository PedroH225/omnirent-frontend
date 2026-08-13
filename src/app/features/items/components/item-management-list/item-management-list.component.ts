import { Component, Input } from '@angular/core';
import { ItemDisplay } from '@core/item/model/item-display-model';
import { Button } from "primeng/button";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-item-management-list',
  imports: [Button, RouterLink],
  templateUrl: './item-management-list.component.html',
  styleUrl: './item-management-list.component.scss'
})
export class ItemManagementListComponent {

  @Input({ required: true })
  item!: ItemDisplay;
}
