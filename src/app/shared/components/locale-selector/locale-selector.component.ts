import { Component, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Locale, LocaleService } from '@core/i18n/locale.service';
import { Select } from 'primeng/select';

@Component({
  selector: 'app-locale-selector',
  imports: [Select, FormsModule],
  templateUrl: './locale-selector.component.html',
  styleUrl: './locale-selector.component.scss',
})
export class LocaleSelectorComponent {
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

  constructor(private localeService: LocaleService) {
    this.locale = localeService.locale;
  }

  setLocale(locale: Locale): void {
    this.localeService.setLocale(locale);
  }
}
