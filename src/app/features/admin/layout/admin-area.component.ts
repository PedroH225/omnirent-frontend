import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminSidebarComponent } from '../components/admin-sidebar/admin-sidebar.component';

@Component({
  selector: 'app-admin-area',
  imports: [RouterModule, AdminSidebarComponent],
  templateUrl: './admin-area.component.html',
  styleUrl: './admin-area.component.scss',
})
export class AdminAreaComponent {}
