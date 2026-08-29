import { Component, Input } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { Button } from 'primeng/button';
import { RentalDisplayModel } from '@features/rentals/model/rental-display-model';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@core/i18n/translation-pipe';

@Component({
  selector: 'app-rental-list-item',
  imports: [
    CommonModule,
    Button,
    DatePipe,
    DecimalPipe,
    RouterLink,
    TranslatePipe,
  ],
  templateUrl: './rental-list-item.component.html',
  styleUrl: './rental-list-item.component.scss',
})
export class RentalListItemComponent {
  @Input({ required: true })
  rental!: RentalDisplayModel;
}
