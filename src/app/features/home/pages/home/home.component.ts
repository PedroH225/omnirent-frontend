import { Component } from '@angular/core';
import { CatalogBarComponent } from "@shared/components/catalog-bar/catalog-bar.component";
import { GalleriaModule } from 'primeng/galleria';

@Component({
  selector: 'app-home',
  imports: [CatalogBarComponent, GalleriaModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  images = [
    {
        itemImageSrc: 'assets/omni-hero-1.png',
        thumbnailImageSrc: 'assets/omni-hero-1.png',
        alt: 'Equipment rental'
    },
    {
        itemImageSrc: 'assets/omni-hero-2.png',
        thumbnailImageSrc: 'assets/omni-hero-2.png',
        alt: 'Tools and equipment'
    },
    {
        itemImageSrc: 'assets/omni-hero-3.png',
        thumbnailImageSrc: 'assets/omni-hero-3.png',
        alt: 'Audiovisual equipment'
    }
];
}
