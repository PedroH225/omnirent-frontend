import { Component, signal, Signal } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MenuItem } from 'primeng/api';
import { ImageModule } from 'primeng/image';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { UserService } from '@core/user/user.service';
import { LoggedUserModel } from '@core/user/model/logged-user-model';
import { AuthService } from '@core/auth/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [
    ToolbarModule,
    ButtonModule,
    SplitButtonModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    RouterModule,
    ImageModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  displayLabel: string = "My Account"

  readonly currentUser: Signal<LoggedUserModel | null>;

  items: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'pi pi-user',
      routerLink: '/account'
    },
    {
      label: 'Logout',
      icon: 'pi pi-sign-out',
      command: () => this.logout()
    }
  ];

  constructor(private userService: UserService, private authService: AuthService, private router: Router) {
    this.currentUser = userService.currentUser;
  }


  logout() {
    this.authService.logout().subscribe({

      next: () => {
        this.router.navigateByUrl('');
      },
      error: (error) => {
        console.error(error);
      }
    })
  }
}
