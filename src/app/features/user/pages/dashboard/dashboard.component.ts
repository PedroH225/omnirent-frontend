import { Component } from '@angular/core';
import { UserSidebarComponent } from "@features/user/components/user-sidebar/user-sidebar.component";
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-dashboard',
  imports: [UserSidebarComponent, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
