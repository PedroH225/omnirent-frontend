import { Component, Input } from '@angular/core';
import { ItemFeedCardModel } from '../../models/item-card-model';
import { Button } from 'primeng/button';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { TranslatePipe } from '@core/i18n/translation-pipe';

@Component({
  selector: 'app-item-feed-card',
  imports: [Button, CurrencyPipe, TranslatePipe],
  templateUrl: './item-feed-card.component.html',
  styleUrl: './item-feed-card.component.scss',
})
export class ItemFeedCardComponent {
  @Input({ required: true })
  item!: ItemFeedCardModel;

  constructor(private router: Router) {
  }

  onView(): void {
    this.router.navigate(['/items', this.item.id]);
  }
}
