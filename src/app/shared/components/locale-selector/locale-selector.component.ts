import { Component, Input, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthStateService } from '@core/auth/auth-state.service';
import { Locale, LocaleService } from '@core/i18n/locale.service';
import { UserPreferences } from '@core/user/model/user-preferences-model';
import { UserPreferencesService } from '@core/user/user-preferences.service';
import { Select } from 'primeng/select';

export enum SelectorMode {
  FULL,
  MINIMAL,
}

@Component({
  selector: 'app-locale-selector',
  imports: [Select, FormsModule],
  templateUrl: './locale-selector.component.html',
  styleUrl: './locale-selector.component.scss',
})
export class LocaleSelectorComponent {
  readonly SelectorMode = SelectorMode;

  @Input()
  mode: SelectorMode = SelectorMode.MINIMAL;

  readonly locale: Signal<Locale>;

  readonly locales = [
    {
      label: 'Português (Brasil)',
      value: 'pt-BR',
      flag: '🇧🇷',
    },
    {
      label: 'English (US)',
      value: 'en-US',
      flag: '🇺🇸',
    },
  ];

  constructor(
    private localeService: LocaleService,
    private preferencesService: UserPreferencesService,
    private authState: AuthStateService,
  ) {
    this.locale = localeService.locale;
  }

  setLocale(locale: Locale): void {
    this.localeService.setLocale(locale);
  }

  onLocaleChange(locale: Locale): void {
    this.localeService.setLocale(locale);

    if (this.authState.isAuthenticated()) {
      const body: UserPreferences = {
        locale,
        timezone: null,
      };

      this.preferencesService.savePreferences(body).subscribe({
        error: (error) => {
          console.error(error);
        },
      });
    }
  }
}
