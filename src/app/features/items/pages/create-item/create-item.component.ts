import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { ItemService } from '@core/item/item.service';
import { ItemRequestModel } from '@features/items/model/item-request-model';
import { ItemImageForm } from '@features/items/model/item-image-form-model';
import { ItemCreatedModel } from '@features/items/model/item-created-model';

import { SaveItemFormComponent } from '@features/items/components/save-item-form/save-item-form.component';

import { MessageService } from 'primeng/api';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FieldError } from '@shared/models/field-error';
import { ApiValidationException } from '@shared/models/api-field-exception';
import { ItemFormModel } from '@features/items/model/item-form-model';

@Component({
    selector: 'app-create-item',
    imports: [
        SaveItemFormComponent,
        ProgressSpinnerModule
    ],
    templateUrl: './create-item.component.html',
    styleUrl: './create-item.component.scss'
})
export class CreateItemComponent {

    loading = false;
    loadingMessage = 'Creating item...';

    private form?: ItemFormModel;
    private images: ItemImageForm[] = [];

    backendErrors: FieldError[] = [];

    constructor(
        private itemService: ItemService,
        private router: Router,
        private messageService: MessageService
    ) { }

    onFormChange(form: ItemFormModel): void {
        this.form = form;
    }

    onImagesChange(images: ItemImageForm[]): void {         
        this.images = images;
    }

    save(): void {
        if (!this.form || !this.form.subCategory?.id || !this.form.address?.id) {
            return;
        }

        const request: ItemRequestModel = {
            name: this.form.name,
            model: this.form.model,
            brand: this.form.brand,
            description: this.form.description,
            basePrice: this.form.basePrice,
            itemCondition: this.form.itemCondition,
            subCategoryId: this.form.subCategory.id,
            addressId: this.form.address.id
        };

        this.loading = true;
        this.loadingMessage = 'Creating item...';

        this.itemService.createItem(request).subscribe({
            next: (response: ItemCreatedModel) => {
                if (this.images.length > 0) {
                    this.uploadImages(response.id);
                } else {
                    this.finishCreation();
                }
            },
            error: (error: HttpErrorResponse) => {
                this.loading = false;

                const apiException = error.error as ApiValidationException;

                if (apiException?.errorCode === 'VALIDATION_ERROR') {
                    this.backendErrors = apiException.fields;

                    this.messageService.add({
                        severity: 'error',
                        summary: 'Validation failed',
                        detail: 'Please review the highlighted fields and try again.'
                    });
                }

                console.error(error);
            }
        });
    }

    private uploadImages(itemId: string): void {
        this.loadingMessage = 'Uploading images...';

        this.itemService.uploadImages(itemId, this.images).subscribe({
            next: () => {
                this.finishCreation();
            },
            error: (error: HttpErrorResponse) => {
                console.log("nego");
                
                this.messageService.add({
                    severity: 'warn',
                    summary: 'Images',
                    detail: 'The item was created, but the images could not be uploaded.'
                });

                console.error(error);

                this.finishCreation();
            }
        });
    }

    private finishCreation(): void {
        this.loading = false;

        this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Item created successfully.'
        });

        this.router.navigate(['/account/my-items']);
    }
}