import { Component, signal, Signal } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MenuItem } from 'primeng/api';
import { ImageModule } from 'primeng/image';
import { RouterModule } from '@angular/router';
import { UserService } from '@core/user/user.service';
import { LoggedUserModel } from '@core/user/model/logged-user-model';

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

  displayLabel : string = "My Account"

  readonly currentUser: Signal<LoggedUserModel | null>;

  items : MenuItem[] = [
  {
    label: 'Meu perfil',
    icon: 'pi pi-user',
    routerLink: '/profile'
  },
  {
    label: 'Sair',
    icon: 'pi pi-sign-out',
    command: () => this.logout()
  }
];

  constructor(private userService: UserService) {
    this.currentUser = userService.currentUser;
  }


  logout() {

  }
}
