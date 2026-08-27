import { Component, Input } from '@angular/core';
import { ItemDisplay } from '@core/item/model/item-display-model';
import { Button } from "primeng/button";
import { RouterLink } from "@angular/router";
import { TranslatePipe } from '@core/i18n/translation-pipe';

@Component({
  selector: 'app-item-management-card',
  imports: [Button, RouterLink, TranslatePipe],
  templateUrl: './item-management-card.component.html',
  styleUrl: './item-management-card.component.scss'
})
export class ItemManagementCardComponent {

  @Input({ required: true })
  item!: ItemDisplay;
}
