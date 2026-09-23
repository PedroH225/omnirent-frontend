import { Component, effect } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStateService } from '@core/auth/auth-state.service';
import { UserService } from '@core/user/user.service';

@Component({
  selector: 'app-oauth',
  imports: [],
  templateUrl: './oauth.component.html',
  styleUrl: './oauth.component.scss',
})
export class OauthComponent {
  constructor(
    private readonly authStateService: AuthStateService,
    private readonly router: Router,
  ) {
    effect(() => {
      if (!this.authStateService.initialized()) {
        return;
      }

      if (this.authStateService.isAuthenticated()) {
        this.router.navigate(['/account']);
        return;
      }

      this.router.navigate(['/login']);
    });
  }
}
