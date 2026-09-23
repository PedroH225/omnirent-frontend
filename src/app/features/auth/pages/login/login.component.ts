import { Component, effect } from '@angular/core';
import { PasswordModule } from 'primeng/password';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { AuthService } from '../../../../core/auth/auth.service';
import { AuthModel } from '../../models/auth.model';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MessageModule } from 'primeng/message';
import { ApiException } from '../../../../shared/models/api-exception';
import { HttpErrorResponse } from '@angular/common/http';
import { TranslatePipe } from '@core/i18n/translation-pipe';
import { TranslationService } from '@core/i18n/translation.service';
import { LocaleService } from '@core/i18n/locale.service';

const DISPLAYABLE_ERRORS = ['INVALID_CREDENTIALS'];

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
  imports: [
    PasswordModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    FloatLabelModule,
    MessageModule,
    FormsModule,
    RouterLink,
    TranslatePipe,
  ],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessageKey: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  login() {
    const payload = new AuthModel(this.email, this.password);

    this.authService.login(payload).subscribe({
      next: () => {
        this.router.navigate(['/account']);
      },
      error: (error: HttpErrorResponse) => {
        const apiError = error.error as ApiException;

        if (apiError.errorCode === 'INVALID_CREDENTIALS') {
          this.errorMessageKey = 'auth.login.invalidCredentials.message';
          return;
        }

        this.errorMessageKey = 'error.unknown.title';
      },
    });
  }

  loginWithGoogle(): void {
    window.location.href = '/api/oauth2/authorization/google';
  }

  loginWithGithub(): void {
    window.location.href = '/api/oauth2/authorization/github';
  }

  private isDisplayableError(error: ApiException): boolean {
    return !!error && DISPLAYABLE_ERRORS.includes(error.errorCode);
  }
}
