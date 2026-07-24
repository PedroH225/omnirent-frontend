import { Component } from '@angular/core';
import { CatalogBarComponent } from "@shared/components/catalog-bar/catalog-bar.component";

@Component({
  selector: 'app-home',
  imports: [CatalogBarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
