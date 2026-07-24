import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ItemCardModel } from '../../../../shared/models/item-card-model';
import { Button } from "primeng/button";
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-item-card',
  imports: [Button, CurrencyPipe],
  templateUrl: './item-card.component.html',
  styleUrl: './item-card.component.scss'
})
export class ItemCardComponent {

  @Input({ required: true })
  item!: ItemCardModel;

  @Output()
  view = new EventEmitter<string>();

  onView(): void {
    this.view.emit(this.item.id);
  }

}