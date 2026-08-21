import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { ItemImageForm, ItemImageView } from '@features/items/model/item-image-form-model';
import { Button } from "primeng/button";

@Component({
  selector: 'app-item-images',
  templateUrl: './item-images.component.html',
  styleUrl: './item-images.component.scss',
  imports: [CommonModule, Button]
})
export class ItemImagesComponent {

  readonly MAX_IMAGES = 5;

  images: ItemImageView[] = [];

  @Output()
  imagesChange = new EventEmitter<ItemImageForm[]>();

  private emitImages(): void {
    this.imagesChange.emit(
      this.images.map(image => ({
        tempId: image.tempId,
        file: image.file,
        order: image.order
      }))
    );
  }

  onFilesSelected(event: Event): void {

    const input = event.target as HTMLInputElement;

    if (!input.files) {
      return;
    }

    const remaining = this.MAX_IMAGES - this.images.length;

    Array.from(input.files)
      .slice(0, remaining)
      .forEach(file => {

        this.images.push({
          tempId: crypto.randomUUID(),
          file,
          previewUrl: URL.createObjectURL(file),
          order: this.images.length
        });

      });

    this.updateOrder();

    input.value = '';
  }

  removeImage(index: number): void {

    URL.revokeObjectURL(this.images[index].previewUrl);

    this.images.splice(index, 1);

    this.updateOrder();
  }

  moveLeft(index: number): void {

    if (index === 0) {
      return;
    }

    [this.images[index - 1], this.images[index]] =
      [this.images[index], this.images[index - 1]];

    this.updateOrder();
  }

  moveRight(index: number): void {

    if (index === this.images.length - 1) {
      return;
    }

    [this.images[index], this.images[index + 1]] =
      [this.images[index + 1], this.images[index]];

    this.updateOrder();
  }

  private updateOrder(): void {

    this.images.forEach((image, index) => {
      image.order = index;
    });

    this.emitImages();
  }

  clear(): void {

    this.images.forEach(image =>
      URL.revokeObjectURL(image.previewUrl)
    );

    this.images = [];

    this.emitImages()
  }

}