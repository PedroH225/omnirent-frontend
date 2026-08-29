import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@core/i18n/translation-pipe';
import { ItemFeedCardModel } from '@shared/models/item-card-model';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-item-feed-list',
  imports: [CommonModule, Button, TranslatePipe],
  templateUrl: './item-feed-list.component.html',
  styleUrl: './item-feed-list.component.scss',
})
export class ItemFeedListComponent {
  @Input({ required: true })
  item!: ItemFeedCardModel;

  constructor(private router: Router) {}

  onView(): void {
    this.router.navigate(['/items', this.item.id]);
  }
}
