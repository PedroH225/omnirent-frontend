import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SelectModule } from 'primeng/select';
import { Button } from 'primeng/button';

import { TranslatePipe } from '@core/i18n/translation-pipe';
import { TranslationService } from '@core/i18n/translation.service';
import { LocaleService } from '@core/i18n/locale.service';
import {
  LocaleSelectorComponent,
  SelectorMode,
} from '@shared/components/locale-selector/locale-selector.component';
import { UserPreferencesService } from '@core/user/user-preferences.service';
import { UserPreferences } from '@core/user/model/user-preferences-model';

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

  selectedTimezone = signal<string>('America/Sao_Paulo');

  timezoneOptions: SelectOption[] = [];

  constructor(
    private readonly localeService: LocaleService,
    private readonly translationService: TranslationService,
    private readonly preferencesService: UserPreferencesService,
  ) {}

  ngOnInit(): void {
    this.loadOptions();
  }

  onTimezoneChange(timezone: string): void {
    this.selectedTimezone.set(timezone);

    const body: UserPreferences = {
      locale: null,
      timezone,
    };

    this.preferencesService.savePreferences(body).subscribe({
      error: (error) => {
        console.error(error);
      },
    });
  }

  deactivateAccount(): void {
    // abrir confirmação ou dialog de desativação
  }

  private loadOptions(): void {
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
