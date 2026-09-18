import { Injectable, signal } from '@angular/core';

export type Locale = 'en-US' | 'pt-BR';

@Injectable({
  providedIn: 'root',
})
export class LocaleService {
  private readonly SUPPORTED_LOCALES = new Set<Locale>(['en-US', 'pt-BR']);

  private readonly _locale = signal<Locale>(this.getSystemLocale());

  readonly locale = this._locale.asReadonly();

  setLocale(locale: string): void {
    if (this.SUPPORTED_LOCALES.has(locale as Locale)) {
      const resolvedLocale = locale as Locale;

      this._locale.set(resolvedLocale);
      this.saveLocaleLocally(resolvedLocale);
    }
  }

  private getSystemLocale(): Locale {
    const localLocale = localStorage.getItem('locale') ?? navigator.language;

    const resolvedLocale = this.resolveLocale(localLocale);

    this.saveLocaleLocally(resolvedLocale);

    return resolvedLocale;
  }

  private resolveLocale(language: string): Locale {
    if (language.toLowerCase().startsWith('pt')) {
      return 'pt-BR';
    }

    return 'en-US';
  }

  private saveLocaleLocally(locale: Locale): void {
    localStorage.setItem('locale', locale);
  }
}
