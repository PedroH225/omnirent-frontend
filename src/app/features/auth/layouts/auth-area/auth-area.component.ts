import { Component } from '@angular/core';
import { RouterModule } from "@angular/router";
import { Card } from "primeng/card";

@Component({
  selector: 'app-auth-area',
  imports: [RouterModule, Card],
  templateUrl: './auth-area.component.html',
  styleUrl: './auth-area.component.scss'
})
export class AuthAreaComponent {

}
