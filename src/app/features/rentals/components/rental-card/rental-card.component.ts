import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RentalDisplayModel } from '@features/rentals/model/rental-display-model';
import { Button } from 'primeng/button';
import { RouterLink } from "@angular/router";
import { TranslatePipe } from '@core/i18n/translation-pipe';

@Component({
  selector: 'app-rental-card',
  imports: [CommonModule, Button, RouterLink, TranslatePipe],
  templateUrl: './rental-card.component.html',
  styleUrl: './rental-card.component.scss'
})
export class RentalCardComponent {

  @Input({ required: true })
  rental!: RentalDisplayModel;
}