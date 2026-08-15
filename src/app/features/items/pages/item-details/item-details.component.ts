import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from '@core/item/item.service';
import { ItemDetailModel } from '@core/item/model/item-detail-model';
import { environment } from '../../../../../environments/environment';
import { UserService } from '@core/user/user.service';
import { Button } from "primeng/button";
import { CommonModule } from '@angular/common';
import { GalleriaModule } from "primeng/galleria";
import { SaveItemFormComponent } from "@features/items/components/save-item-form/save-item-form.component";
import { Dialog } from "primeng/dialog";
import { UpdateItemRequestModel } from '@features/items/model/item-update-request-model';
import { HttpErrorResponse } from '@angular/common/http';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { FieldError } from '@shared/models/field-error';
import { ApiValidationException } from '@shared/models/api-field-exception';
import { Menu } from 'primeng/menu';
import { forkJoin, Observable } from 'rxjs';
import { ItemFormModel } from '@features/items/model/item-form-model';
import { EnumOption } from '@shared/models/EnumOption';
import { RentalService } from '@core/rental/rental.service';
import { FormsModule } from '@angular/forms';
import { CreateRentalRequest } from '@features/rentals/model/create-rental-request-model';
import { ConfirmDialog } from "primeng/confirmdialog";

@Component({
  selector: 'app-item-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, Button, GalleriaModule, SaveItemFormComponent, Dialog, Menu, ConfirmDialog],
  providers: [ConfirmationService],
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.scss'
})
export class ItemDetailComponent implements OnInit {
  @ViewChild(SaveItemFormComponent)
  saveItemForm?: SaveItemFormComponent;

  editDialogVisible = false;

  readonly defaultImage: string = 'assets/placeholder-img.png';

  private form?: ItemFormModel;

  backendErrors: FieldError[] = [];

  rentalPeriods: EnumOption[] = [];
  selectedRentalPeriod = 'DAILY'

  selectedRentalPeriodLabel = 'Daily';

  selectedPrice = 0;

  galleryImages: {
    itemImageSrc: string;
    thumbnailImageSrc: string;
    alt: string;
  }[] = [];

  itemMenuItems: MenuItem[] = [];

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
    private messageService: MessageService, private router: Router, private rentalService: RentalService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    const itemId = this.route.snapshot.paramMap.get('id');

    if (!itemId) {
      return;
    }

    this.loadItem(itemId);
    this.getRentalPeriods();
  }

  private updateItemMenu(): void {
    if (!this.item) {
      return;
    }

    const isAvailable = this.item.itemStatus === 'AVAILABLE';

    this.itemMenuItems = [
      {
        label: 'Edit',
        icon: 'pi pi-pencil',
        command: () => this.openEditDialog()
      },
      {
        label: isAvailable ? 'Make unavailable' : 'Make available',
        icon: isAvailable ? 'pi pi-eye-slash' : 'pi pi-eye',
        command: () => this.changeAvailability()
      }
    ];
  }

  private loadItem(itemId: string): void {
    this.isLoading = true;

    this.itemService.getItemDetail(itemId).subscribe({
      next: item => {
        this.item = item;

        this.isOwner = this.userService.currentUser()?.id === item.owner.id;
        this.loadGallery();
        this.isLoading = false;
        this.updateItemMenu();
        this.updateSelectedPrice();

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

  onFormSubmit(): void {
    if (!this.form || !this.item) {
      console.log("return")
      this.closeEditDialog();
      return;
    }

    const requests: {
      item?: Observable<any>;
      address?: Observable<any>;
      category?: Observable<any>;
    } = {};

    const itemRequest = this.parseUpdateRequest();

    if (itemRequest) {
      requests.item = this.itemService.updateItem(itemRequest);
    }

    if (this.form.address && this.form.address.id !== this.item.pickupAddress.id) {
      requests.address = this.itemService.changeAddress(
        this.item.id,
        this.form.address.id
      );
    }

    if (this.form.subCategory && this.form.subCategory.id !== this.item.subCategory.id) {
      requests.category = this.itemService.changeSubcategory(
        this.item.id,
        this.form.subCategory.id
      );
    }

    if (Object.keys(requests).length === 0) {
      this.closeEditDialog();
      return;
    }

    forkJoin(requests).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Item updated successfully.'
        });

        if (this.item && this.form?.subCategory &&
          this.item.subCategory.id !== this.form.subCategory.id) {
          this.item.subCategory = this.form.subCategory;
        }

        if (this.item && this.form?.address &&
          this.item.pickupAddress.id !== this.form.address.id) {
          this.item.pickupAddress = this.form.address;
        }

        this.closeEditDialog();
      },
      error: (error: HttpErrorResponse) => {
        const apiException = error.error as ApiValidationException;

        if (apiException?.errorCode === 'VALIDATION_ERROR') {
          console.log("validation error")
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

  changeAvailability() {
    if (!this.item) {
      return;
    }
    this.itemService.changeAvailability(this.item.id).subscribe({
      next: () => {
        if (!this.item) {
          return;
        }
        if (this.item.itemStatus === 'AVAILABLE') {
          this.item.itemStatus = 'UNAVAILABLE';
          this.item.itemStatusLabel = 'Unavailable';
        } else {
          this.item.itemStatus = 'AVAILABLE';
          this.item.itemStatusLabel = 'Available';
        }
        this.updateItemMenu();

        this.messageService.add({
          severity: 'success',
          summary: 'Availability updated',
          detail: `Item is now ${this.item.itemStatusLabel.toLowerCase()}.`
        });
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  onRentalPeriodChange(): void {
    this.updateSelectedPrice();
  }

  private updateSelectedPrice(): void {
    if (!this.item) {
      return;
    }
    const option = this.rentalPeriods.find(
      p => p.code === this.selectedRentalPeriod
    );

    this.selectedRentalPeriodLabel = option?.label ?? '';

    switch (this.selectedRentalPeriod) {

      case 'HOURLY':
        this.selectedPrice = this.item.priceData.hourPrice;
        break;

      case 'DAILY':
        this.selectedPrice = this.item.priceData.dailyPrice;
        break;

      case 'WEEKLY':
        this.selectedPrice = this.item.priceData.weeklyPrice;
        break;

      case 'MONTHLY':
        this.selectedPrice = this.item.priceData.monthlyPrice;
        break;
    }
  }

  getRentalPeriods(): void {
    this.rentalService.getRentalEnums().subscribe({
      next: (response) => {
        this.rentalPeriods = response.rentalPeriods;
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
      }
    }
    )
  }

  rentItem(): void {
    if (!this.item) {
      return;
    }

    this.confirmationService.confirm({
      header: 'Confirm rental',
      message: `You are about to rent "${this.item.name}" at R$ ${this.selectedPrice.toFixed(2)}/${this.selectedRentalPeriodLabel.toLowerCase()}. Do you want to continue?`,
      icon: 'pi pi-question-circle',
      acceptLabel: 'Rent',
      rejectLabel: 'Cancel',
      rejectButtonStyleClass: 'p-button-danger',
      accept: () => {
        const request: CreateRentalRequest = {
          itemId: this.item!.id,
          rentalPeriod: this.selectedRentalPeriod
        };

        // this.rentalService.createRental(request)...
      }
    });
  }

  onFormChange($event: ItemFormModel) {
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