import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ItemFeedCardModel } from '../../models/item-card-model';
import { Button } from "primeng/button";
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-feed-card',
  imports: [Button, CurrencyPipe],
  templateUrl: './item-feed-card.component.html',
  styleUrl: './item-feed-card.component.scss'
})
export class ItemFeedCardComponent {

  @Input({ required: true })
  item!: ItemFeedCardModel;

  constructor(private router: Router) { }


  onView(): void {
    this.router.navigate(['/items', this.item.id]);

  }

}