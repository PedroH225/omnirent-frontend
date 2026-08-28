import { Component } from '@angular/core';
import { PasswordModule } from 'primeng/password'
import { CardModule } from 'primeng/card'
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { AuthService } from '../../../../core/auth/auth.service';
import { AuthModel, TokenResponse } from '../../models/auth.model';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MessageModule } from 'primeng/message';
import { ApiException } from '../../../../shared/models/api-exception';
import { HttpErrorResponse } from '@angular/common/http';
import { TranslatePipe } from '@core/i18n/translation-pipe';


const DISPLAYABLE_ERRORS = [
  'INVALID_CREDENTIALS'
];

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
    TranslatePipe
  ],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = ''

  constructor(
    private authService: AuthService,
    private router: Router) { }


  login() {
    localStorage.removeItem("token");

    const payload = new AuthModel(
      this.email,
      this.password
    );
    this.authService.login(payload).subscribe(
      (response) => {
        const token: TokenResponse = response as TokenResponse;
        localStorage.setItem("token", token.token);
        this.router.navigate(['/account']);

      }, (error: HttpErrorResponse) => {
        const apiError = error.error as ApiException;

        if (apiError?.errorCode && apiError?.message &&
          this.isDisplayableError(apiError)
        ) {
          this.errorMessage = apiError.message;
          return;
        }
        this.errorMessage = 'Unexpected error. Try again later.';
      }
    );
  }

  private isDisplayableError(error: ApiException): boolean {
    return !!error &&
      DISPLAYABLE_ERRORS.includes(error.errorCode);
  }
}
