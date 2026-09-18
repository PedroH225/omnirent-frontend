import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserService } from '@core/user/user.service';
import { UserDetail } from '@core/user/model/user-detail-model';
import { TranslatePipe } from '@core/i18n/translation-pipe';
import { TranslationService } from '@core/i18n/translation.service';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, TranslatePipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  user = signal<UserDetail | null>(null);

  constructor(
    private readonly userService: UserService,
    private readonly translationService: TranslationService,
  ) {}

  ngOnInit(): void {
    this.userService.findById().subscribe({
      next: (user) => {
        this.user.set(user);
      },
    });
  }

  getStatusLabel(status: string): string {
    return this.translationService.translate(
      `account.profile.status.${status}`,
    );
  }
}
