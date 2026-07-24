import { Component } from '@angular/core';
import { PasswordModule } from 'primeng/password'
import { CardModule } from 'primeng/card'
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { AuthService } from '../../../../core/auth/auth.service';
import { AuthModel, TokenResponse } from '../../models/auth.model';
import { Router } from '@angular/router';
import { MyItemsComponent } from '../../../items/pages/my-items/my-items.component/my-items.component';

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

  constructor(
    private authService: AuthService,
    private router : Router) { }


  login() {
    localStorage.removeItem("token");

    const payload = new AuthModel(
      this.email,
      this.password
    );
    this.authService.login(payload).subscribe(
      (response) => {
        const token: TokenResponse = response as TokenResponse;
        localStorage.setItem("token", token.token);
        this.router.navigate(['/my-items']);

      }, (error) => {
        console.log(error);
      }
    );


  }
}
