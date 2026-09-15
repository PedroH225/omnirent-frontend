import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AdminSidebarComponent } from '../components/admin-sidebar/admin-sidebar.component';
import { UserService } from '@core/user/user.service';

@Component({
  selector: 'app-admin-area',
  imports: [RouterModule, AdminSidebarComponent],
  templateUrl: './admin-area.component.html',
  styleUrl: './admin-area.component.scss',
})
export class AdminAreaComponent {
  constructor(
    private userService: UserService,
    private router: Router,
  ) {}

  ngOnInit() {
  }
}
