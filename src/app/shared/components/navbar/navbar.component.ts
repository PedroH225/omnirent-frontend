import { Component, effect, Input, Signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MenuItem } from 'primeng/api';
import { ImageModule } from 'primeng/image';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '@core/user/user.service';
import { LoggedUserModel } from '@core/user/model/logged-user-model';
import { AuthService } from '@core/auth/auth.service';
import { FeedFilterStateService } from '@core/feed/feed-filter-state.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@core/i18n/translation-pipe';
import { LocaleSelectorComponent } from '../locale-selector/locale-selector.component';
import { TranslationService } from '@core/i18n/translation.service';
import { LocaleService } from '@core/i18n/locale.service';

type NavbarMode = 'default' | 'auth';

@Component({
  selector: 'app-navbar',
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    SplitButtonModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    RouterModule,
    ImageModule,
    TranslatePipe,
    LocaleSelectorComponent,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  @Input() mode: NavbarMode = 'default';

  readonly currentUser: Signal<LoggedUserModel | null>;

  items: MenuItem[] = [];

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private readonly feedFilterState: FeedFilterStateService,
    private translationService: TranslationService,
    private localeService: LocaleService,
  ) {
    effect(() => {
      this.localeService.locale();

      this.buildMenuItems();
    });
    this.currentUser = userService.currentUser;
  }

  private buildMenuItems(): void {
    this.items = [
      {
        label: this.translationService.translate('navbar.dashboard'),
        icon: 'pi pi-user',
        routerLink: '/account',
      },
      {
        label: this.translationService.translate('navbar.logout'),
        icon: 'pi pi-sign-out',
        command: () => this.logout(),
      },
    ];
  }

  onSearch(title: string): void {
    this.feedFilterState.setTitle(title);
    this.feedFilterState.updateFeedUrl();
  }

  toggleTheme() {
    throw new Error('Method not implemented.');
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigateByUrl('');
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
