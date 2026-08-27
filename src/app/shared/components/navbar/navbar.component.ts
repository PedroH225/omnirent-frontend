import { Component, Signal } from '@angular/core';
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
import { Locale, LocaleService } from '@core/i18n/locale.service';
import { Select } from "primeng/select";
import { FormsModule } from '@angular/forms';
import { TranslationService } from '@core/i18n/translation.service';
import { TranslatePipe } from '@core/i18n/translation-pipe';

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
    Select,
    TranslatePipe
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  displayLabel: string = 'My Account';

  readonly currentUser: Signal<LoggedUserModel | null>;
  readonly locale: Signal<Locale>;

  items: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'pi pi-user',
      routerLink: '/account'
    },
    {
      label: 'Logout',
      icon: 'pi pi-sign-out',
      command: () => this.logout()
    }
  ];
  readonly locales = [
    {
      label: 'Português (Brasil)',
      value: 'pt-BR',
      flag: '🇧🇷'
    },
    {
      label: 'English (US)',
      value: 'en-US',
      flag: '🇺🇸'
    }
  ];

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private readonly feedFilterState: FeedFilterStateService,
    private readonly localeService: LocaleService,
  ) {
    this.currentUser = userService.currentUser;
    this.locale = localeService.locale;
  }

  onSearch(title: string): void {
    this.feedFilterState.setTitle(title);
    this.feedFilterState.updateFeedUrl();
  }

  setLocale(locale: Locale): void {
    console.log("bosta");
    
    this.localeService.setLocale(locale);

    console.log(this.localeService.locale());
    
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
      }
    });
  }
}