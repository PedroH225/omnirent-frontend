import { Component } from '@angular/core';
import { TranslatePipe } from '@core/i18n/translation-pipe';

@Component({
  selector: 'app-returned',
  imports: [TranslatePipe],
  templateUrl: './returned.component.html',
  styleUrl: './returned.component.scss',
})
export class ReturnedComponent {}
