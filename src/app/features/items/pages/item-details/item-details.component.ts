import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '@core/item/item.service';
import { ItemDetailModel } from '@core/item/model/item-detail-model';
import { environment } from '../../../../../environments/environment';
import { UserService } from '@core/user/user.service';
import { Button } from "primeng/button";
import { CommonModule } from '@angular/common';
import { GalleriaModule } from "primeng/galleria";


@Component({
  selector: 'app-item-detail',
  standalone: true,
  imports: [CommonModule, Button, GalleriaModule],
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.scss'
})
export class ItemDetailComponent implements OnInit {

  readonly defaultImage: string = 'assets/placeholder-img.png';

  galleryImages: {
    itemImageSrc: string;
    thumbnailImageSrc: string;
    alt: string;
  }[] = [];

  responsiveOptions = [
    {
      breakpoint: '991px',
      numVisible: 4
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 2
    }
  ];

  private readonly storageUrl = environment.storageUrl;

  item: ItemDetailModel | null = null;

  isLoading = true;
  isOwner = false;

  constructor(private itemService: ItemService, private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    const itemId = this.route.snapshot.paramMap.get('id');

    if (!itemId) {
      return;
    }

    this.loadItem(itemId);
  }

  private loadItem(itemId: string): void {
    this.isLoading = true;

    this.itemService.getItemDetail(itemId).subscribe({
      next: item => {
        this.item = item;

        this.isOwner = this.userService.currentUser()?.id === item.owner.id;
        this.loadGallery();
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  private loadGallery(): void {
    if (!this.item) {
      return;
    }

    if (this.item.images.length === 0) {
      this.galleryImages = [
        {
          itemImageSrc: this.defaultImage,
          thumbnailImageSrc: this.defaultImage,
          alt: 'Imagem not found'
        }
      ];

      return;
    }

    this.galleryImages = this.item.images
      .sort((a, b) => a.displayOrder - b.displayOrder)
      .map(image => ({
        itemImageSrc: this.getImageUrl(image.storageKey),
        thumbnailImageSrc: this.getImageUrl(image.storageKey),
        alt: this.item!.name
      }));
  }

  getImageUrl(storageKey: string): string {
    return `${this.storageUrl}/${storageKey}`;
  }
}