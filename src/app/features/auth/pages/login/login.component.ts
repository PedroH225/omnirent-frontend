import { Component } from '@angular/core';
import { PasswordModule } from 'primeng/password'
import { CardModule } from 'primeng/card'
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
  imports: [
  PasswordModule,
  CardModule,
  ButtonModule,
  InputTextModule,
  FloatLabelModule,
  FormsModule
  ],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
}
