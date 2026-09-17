import { Component } from '@angular/core';
import { TranslatePipe } from '@core/i18n/translation-pipe';

@Component({
  selector: 'app-admin-dashboard',
  imports: [TranslatePipe],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
})
export class AdminDashboardComponent {}
