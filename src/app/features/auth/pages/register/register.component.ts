import { Component } from '@angular/core';
import { Card } from "primeng/card";
import { DatePickerModule } from 'primeng/datepicker';
import { SaveUserFormComponent } from "@features/auth/components/save-user-form/save-user-form.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [Card, DatePickerModule, SaveUserFormComponent, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  register() {
    throw new Error('Method not implemented.');
  }

}
