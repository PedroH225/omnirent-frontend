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
import { UserService } from '@core/user/user.service';
import { AuthService } from '@core/auth/auth.service';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';

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
    ConfirmDialog
],
  providers: [ConfirmationService],
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
    private readonly userService: UserService,
    private readonly authenticationService: AuthService,
    private readonly router: Router,
    private readonly confirmationService: ConfirmationService
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
    this.confirmationService.confirm({
      header: this.translationService.translate(
        'account.configurations.deactivate.confirm.title',
      ),
      message: this.translationService.translate(
        'account.configurations.deactivate.confirm.message',
      ),
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: this.translationService.translate(
        'account.configurations.deactivate.confirm.accept',
      ),
      rejectLabel: this.translationService.translate(
        'account.configurations.deactivate.confirm.cancel',
      ),
      acceptButtonProps: {
        severity: 'danger',
      },
      accept: () => {
        this.userService.toggleActivatedStatus().subscribe({
          next: () => {
            this.userService.clearCurrentUser();
            this.router.navigate(['/']);
          },
          error: (error) => {
            console.error(error);
          },
        });
      },
    });
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
