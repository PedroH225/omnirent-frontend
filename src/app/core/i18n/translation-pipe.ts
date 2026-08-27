import { Pipe, PipeTransform, inject } from '@angular/core';
import { TranslationService } from './translation.service';
import { LocaleService } from './locale.service';

@Pipe({
  name: 'translate',
  standalone: true,
  pure: false
})
export class TranslatePipe implements PipeTransform {

  private readonly localeService = inject(LocaleService);
  private readonly translationService = inject(TranslationService);

  transform(key: string): string {
    this.localeService.locale();

    return this.translationService.translate(key);
  }
}