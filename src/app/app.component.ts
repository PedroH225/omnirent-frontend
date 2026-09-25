import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { CsrfService } from '@core/auth/csrf.service';
import { CacheService } from '@core/cache/cache.service';
import { TranslationService } from '@core/i18n/translation.service';
import { UserService } from '@core/user/user.service';
import { isApiOfflineTime } from '@shared/utils/api-offline-helper';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Toast],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'omnirent-frontend';

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private messageService: MessageService,
    private csrfService: CsrfService,
    private cacheService: CacheService,
    private translationService: TranslationService,
  ) {
    this.cacheService.clearInvalid();
    this.csrfService.loadToken().subscribe();
    this.userService.loadLoggedUserData().subscribe();
  }

  ngAfterViewInit(): void {
    if (isApiOfflineTime()) {
      this.messageService.add({
        key: 'offline',
        severity: 'info',
        summary: this.translationService.translate('api.offline.title'),
        detail: this.translationService.translate('api.offline.detail'),
        life: 15000,
      });
    }
  }
}
