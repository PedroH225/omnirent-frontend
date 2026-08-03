import { Component } from '@angular/core';
import { UserSidebarComponent } from "@features/user/components/user-sidebar/user-sidebar.component";
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-user-layout',
  imports: [UserSidebarComponent, RouterModule],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.scss'
})
export class UserLayoutComponent {

}
