import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SelectModule } from 'primeng/select';
import { Button } from 'primeng/button';

import { TranslatePipe } from '@core/i18n/translation-pipe';
import { TranslationService } from '@core/i18n/translation.service';
import { LocaleService } from '@core/i18n/locale.service';
import { LocaleSelectorComponent, SelectorMode } from '@shared/components/locale-selector/locale-selector.component';

interface SelectOption {
  label: string;
  value: string;
}

@Component({
  selector: 'app-user-configurations',
  imports: [
    FormsModule,
    SelectModule,
    Button,
    TranslatePipe,
    LocaleSelectorComponent,
  ],
  templateUrl: './user-configurations.component.html',
  styleUrl: './user-configurations.component.scss',
})
export class UserConfigurationsComponent implements OnInit {
  readonly SelectorMode = SelectorMode;

  selectedLanguage = signal<string>('pt-BR');
  selectedTimezone = signal<string>('America/Sao_Paulo');

  languageOptions: SelectOption[] = [];
  timezoneOptions: SelectOption[] = [];

  constructor(
    private readonly localeService: LocaleService,
    private readonly translationService: TranslationService,
  ) {}

  ngOnInit(): void {
    this.loadOptions();
  }

  onLanguageChange(locale: string): void {
    this.selectedLanguage.set(locale);

    // use aqui o método que você já possui no LocaleService
    // this.localeService.setLocale(locale);

    this.loadOptions();
  }

  onTimezoneChange(timezone: string): void {
    this.selectedTimezone.set(timezone);

    // persistir posteriormente no backend/localStorage
  }

  deactivateAccount(): void {
    // abrir confirmação ou dialog de desativação
  }

  private loadOptions(): void {
    this.languageOptions = [
      {
        label: this.translationService.translate(
          'account.configurations.languages.ptbr',
        ),
        value: 'pt-BR',
      },
      {
        label: this.translationService.translate(
          'account.configurations.languages.en',
        ),
        value: 'en',
      },
    ];

    this.timezoneOptions = [
      {
        label: this.translationService.translate(
          'account.configurations.timezones.saopaulo',
        ),
        value: 'America/Sao_Paulo',
      },
      {
        label: this.translationService.translate(
          'account.configurations.timezones.newyork',
        ),
        value: 'America/New_York',
      },
      {
        label: this.translationService.translate(
          'account.configurations.timezones.london',
        ),
        value: 'Europe/London',
      },
      {
        label: this.translationService.translate(
          'account.configurations.timezones.utc',
        ),
        value: 'UTC',
      },
    ];
  }
}
