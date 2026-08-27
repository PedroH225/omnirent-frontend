import { computed, Injectable } from '@angular/core';
import { LocaleService } from './locale.service';
import { ptBR } from './translations/pt-BR';
import { enUS } from './translations/en-US';

const translations = {
  'pt-BR': ptBR,
  'en-US': enUS
};

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor(
    private readonly localeService: LocaleService
  ) {}

  translate(key: string): string {
    const dictionary = translations[this.localeService.locale()];

    const value = key
      .split('.')
      .reduce<unknown>((current, part) => {
        if (current && typeof current === 'object' && part in current) {
          return (current as Record<string, unknown>)[part];
        }

        return undefined;
      }, dictionary);

    return typeof value === 'string' ? value : key;
  }

  translation(key: string) {
    return computed(() => {
      this.localeService.locale();

      return this.translate(key);
    });
  }
}