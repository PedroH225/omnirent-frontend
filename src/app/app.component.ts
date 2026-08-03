import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { UserService } from '@core/user/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'omnirent-frontend';


  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {
    if (this.authService.isAuthenticated()) {
      this.userService.loadLoggedUserData();
    }
  }
}