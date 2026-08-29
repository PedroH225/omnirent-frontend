import { Injectable, signal } from '@angular/core';

export type Locale = 'en-US' | 'pt-BR';

@Injectable({
  providedIn: 'root'
})
export class LocaleService {

  private readonly SUPPORTED_LOCALES = new Set<Locale>([
    'en-US',
    'pt-BR'
  ]);

  private readonly _locale = signal<Locale>(this.getSystemLocale());

  readonly locale = this._locale.asReadonly();

  setLocale(locale: string): void {
    if (this.SUPPORTED_LOCALES.has(locale as Locale)) {
      this._locale.set(locale as Locale);
    }
  }

  private getSystemLocale(): Locale {
    const language = navigator.language.split('-')[0].toLowerCase();

    if (language === 'pt') {
      return 'pt-BR';
    }

    return 'en-US';
  }
}