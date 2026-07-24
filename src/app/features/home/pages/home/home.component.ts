import { Component } from '@angular/core';
import { CategoryService } from '@core/categories/category.service';
import { ItemService } from '@core/item/item.service';
import { ItemFeed } from '@core/item/model/item-feed-model';
import { CategoryResponse } from '@core/categories/model/category.model';

import { CatalogBarComponent } from '@shared/components/catalog-bar/catalog-bar.component';

import { GalleriaModule } from 'primeng/galleria';
import { environment } from '../../../../../environments/environment';
import { SelectOption } from '../../../../../shared/models/select-option';
import { ItemCardModel } from '../../../../../shared/models/item-card-model';
import { ItemCardComponent } from "@shared/components/item-card/item-card.component";

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
    CatalogBarComponent,
    GalleriaModule,
    ItemCardComponent
],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {

    storageUrl = environment.storageUrl;

    categories: SelectOption<CategoryResponse>[] = [];

    audiovisualCards: ItemCardModel[] = [];
    constructionCards: ItemCardModel[] = [];
    eventsCards: ItemCardModel[] = [];

    constructor(
        private categoryService: CategoryService,
        private itemService: ItemService
    ) {}

    ngOnInit(): void {
        this.getCategories();

        this.loadCategoryItems('AUDIOVISUAL', this.audiovisualCards);
        this.loadCategoryItems('CONSTRUCTION', this.constructionCards);
        this.loadCategoryItems('EVENTS', this.eventsCards);
    }

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

    getCategories(): void {
        this.categoryService.getCategoriesWithSub().subscribe({
            next: (response) => {
                this.categories = response.map(category => ({
                    label: category.categoryLabel,
                    value: category
                }));
            },
            error: (error) => {
                console.error(error);
            }
        });
    }

loadCategoryItems(
    category: string,
    target: ItemCardModel[]
): void {
    this.itemService.getItemFeedHome(category).subscribe({
        next: (response) => {
            target.push(
                ...response.content.map(item => this.mapItem(item))
            );
        },
        error: (error) => {
            console.error(error);
        }
    });
}

    mapItem(item: ItemFeed): ItemCardModel {
        return {
            id: item.id,
            name: item.name,
            conditionLabel: item.itemConditionLabel,
            price: {
                dailyPrice: item.price.dailyPrice
            },
            imageUrl: item.thumbnailStorageKey
                ? `${this.storageUrl}/items/${item.thumbnailStorageKey}`
                : undefined
        };
    }
}