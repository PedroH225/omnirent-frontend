import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataViewModule, DataViewPageEvent } from 'primeng/dataview';
import { SelectButtonModule } from 'primeng/selectbutton';
import { RentalService } from '@core/rental/rental.service';

import { ActivatedRoute, Router } from '@angular/router';
import { RentalCardComponent } from '../components/rental-card/rental-card.component';
import { RentalDisplayModel } from '../model/rental-display-model';
import { environment } from '../../../../environments/environment';
import { PageResponse } from '../../../shared/models/page.response.model';
import { RentalListItemComponent } from "../components/rental-list-item/rental-list-item.component";

@Component({
  selector: 'app-renting-out',
  imports: [
    CommonModule,
    FormsModule,
    DataViewModule,
    SelectButtonModule,
    RentalCardComponent,
    RentalListItemComponent
  ],
  templateUrl: './renting-out.component.html',
  styleUrl: './renting-out.component.scss'
})
export class RentingOutComponent {

  page!: number;
  size!: number;
  totalElements!: number;


  layout: 'grid' | 'list' = 'grid';

  options = [
    { label: 'Grid', value: 'grid' },
    { label: 'List', value: 'list' }
  ];

  rentals: RentalDisplayModel[] = [];

  storageUrl = environment.storageUrl;


  constructor(
    private rentalService: RentalService,
    private route: ActivatedRoute,
    private router: Router
  ) { }


  ngOnInit() {

    this.route.queryParams.subscribe(params => {

      if (params['page'] == null || params['size'] == null) {
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: {
            page: 0,
            size: 20
          },
          replaceUrl: true
        });
        return;
      }

      this.page = Number(params['page'] ?? 0);
      this.size = Number(params['size'] ?? 20);

      this.gerRentingOut(this.page, this.size);

    });

  }

  onPageChange(event: DataViewPageEvent): void {

    const page = Math.floor((event.first ?? 0) / (event.rows ?? this.size));

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page,
        size: event.rows
      },
      queryParamsHandling: 'merge'
    });

  }


  gerRentingOut(page: number, size: number): void {

    this.rentalService.getRentingOut(page, size)
      .subscribe({

        next: (response: PageResponse<RentalDisplayModel>) => {
          this.totalElements = response.totalElements;
          this.rentals = response.content.map(rental => ({
            ...rental,
            itemSnapshotDto: {
              ...rental.itemSnapshotDto,
              thumbnailKey: rental.itemSnapshotDto.thumbnailKey
                ? `${this.storageUrl}/${rental.itemSnapshotDto.thumbnailKey}`
                : null
            }
          }));

        },

        error: error => {
          console.error(error);
        }

      });

  }
}
