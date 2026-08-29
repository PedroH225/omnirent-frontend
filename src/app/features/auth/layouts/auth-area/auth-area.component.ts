import { Component } from '@angular/core';
import { RouterModule } from "@angular/router";
import { NavbarComponent } from "@shared/components/navbar/navbar.component";

@Component({
  selector: 'app-auth-area',
  imports: [RouterModule, NavbarComponent],
  templateUrl: './auth-area.component.html',
  styleUrl: './auth-area.component.scss'
})
export class AuthAreaComponent {

}
