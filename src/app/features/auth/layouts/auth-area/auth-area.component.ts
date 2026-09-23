import { Component, effect } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthStateService } from '@core/auth/auth-state.service';
import { NavbarComponent } from '@shared/components/navbar/navbar.component';

@Component({
  selector: 'app-auth-area',
  imports: [RouterModule, NavbarComponent],
  templateUrl: './auth-area.component.html',
  styleUrl: './auth-area.component.scss',
})
export class AuthAreaComponent {
  constructor(
    private authStateService: AuthStateService,
    private router: Router,
  ) {
    effect(() => {
      if (this.authStateService.isAuthenticated()) {
        this.router.navigate(['/account']);
        return;
      }
    });
  }
}
