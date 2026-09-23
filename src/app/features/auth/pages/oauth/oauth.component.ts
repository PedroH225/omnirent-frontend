import { Component, effect } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private readonly route: ActivatedRoute,
  ) {
    const error = this.route.snapshot.queryParamMap.get('error');

    if (error !== null) {
      this.router.navigate(['/auth/login'], {
        queryParams: { oauthError: true },
      });
      return;
    }
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
