import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '@core/item/item.service';
import { ItemDetailModel } from '@core/item/model/item-detail-model';
import { environment } from '../../../../../environments/environment';
import { UserService } from '@core/user/user.service';
import { Button } from "primeng/button";
import { CommonModule } from '@angular/common';
import { GalleriaModule } from "primeng/galleria";
import { SaveItemFormComponent } from "@features/items/components/save-item-form/save-item-form.component";
import { Dialog } from "primeng/dialog";
import { ItemRequestModel } from '@features/items/model/item-request-model';
import { UpdateItemRequestModel } from '@features/items/model/item-update-request-model';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { FieldError } from '@shared/models/field-error';
import { ApiValidationException } from '@shared/models/api-field-exception';
import { PanelMenu } from "primeng/panelmenu";
import { Menu } from 'primeng/menu';

@Component({
  selector: 'app-item-detail',
  standalone: true,
  imports: [CommonModule, Button, GalleriaModule, SaveItemFormComponent, Dialog, Menu],
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.scss'
})
export class ItemDetailComponent implements OnInit {
  deleteItem() {
    throw new Error('Method not implemented.');
  }
  @ViewChild(SaveItemFormComponent)
  saveItemForm?: SaveItemFormComponent;

  editDialogVisible = false;

  readonly defaultImage: string = 'assets/placeholder-img.png';

  private form?: ItemRequestModel;

  backendErrors: FieldError[] = [];

  galleryImages: {
    itemImageSrc: string;
    thumbnailImageSrc: string;
    alt: string;
  }[] = [];

  itemMenuItems = [
    {
      label: 'Editar',
      icon: 'pi pi-pencil',
      command: () => this.openEditDialog()
    },
    {
      label: 'Excluir',
      icon: 'pi pi-trash',
      command: () => this.deleteItem()
    }
  ];

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

  constructor(
    private itemService: ItemService, private route: ActivatedRoute, private userService: UserService,
    private messageService: MessageService) { }

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

  updateItem(): void {
    if (!this.form) {
      return;
    }
    const request = this.parseUpdateRequest();

    if (!request) {
      return;
    }

    this.itemService.updateItem(request).subscribe({
      next: (updated) => {
        if (!this.item) {
          return;
        }

        this.item = {
          ...this.item,
          ...updated
        };

        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Item updated successfully.'
        });
        this.closeEditDialog();
      },
      error: (error: HttpErrorResponse) => {
        const apiException = error.error as ApiValidationException;

        if (apiException?.errorCode === 'VALIDATION_ERROR') {
          this.backendErrors = apiException.fields;

          this.messageService.add({
            severity: 'error',
            summary: 'Validation failed',
            detail: 'Please review the highlighted fields and try again.'
          });

          return;
        }

        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to update item.'
        });

        console.error(error);
        this.closeEditDialog();
      }
    });

  }

  onFormChange($event: ItemRequestModel) {
    this.form = $event;
  }

  openEditDialog(): void {
    this.editDialogVisible = true;
  }

  closeEditDialog(): void {
    this.backendErrors = [];
    this.editDialogVisible = false;

    this.saveItemForm?.resetForm();
  }

  private parseUpdateRequest(): UpdateItemRequestModel | null {
    if (!this.item || !this.form) {
      return null;
    }

    return {
      id: this.item.id,
      name: this.form.name,
      model: this.form.model,
      brand: this.form.brand,
      description: this.form.description,
      basePrice: this.form.basePrice,
      itemCondition: this.form.itemCondition
    };
  }

  clearFieldError(field: string): void {
    this.backendErrors = this.backendErrors.filter(
      error => error.field !== field
    );
  }
}