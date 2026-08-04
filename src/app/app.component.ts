import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { UserService } from '@core/user/user.service';
import { MessageService } from 'primeng/api';
import { Toast } from "primeng/toast";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Toast],
  providers: [
    MessageService
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'omnirent-frontend';


  constructor(
    private authService: AuthService,
    private userService: UserService,
    private messageService: MessageService
  ) {
    if (this.authService.isAuthenticated()) {
      this.userService.loadLoggedUserData();
    }
  }
}