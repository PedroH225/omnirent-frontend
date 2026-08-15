import { Component } from '@angular/core';
import { RentalDetailModel } from '../model/rental-detail-model';
import { ActivatedRoute, Router } from '@angular/router';
import { RentalService } from '@core/rental/rental.service';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-rental-detail',
  imports: [CommonModule],
  templateUrl: './rental-detail.component.html',
  styleUrl: './rental-detail.component.scss'
})
export class RentalDetailComponent {
  storageUrl = environment.storageUrl;

  rental: RentalDetailModel | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private rentalService: RentalService
  ) { }

  ngOnInit(): void {
    this.loadRental();
  }

  private loadRental(): void {
    const rentalId = this.route.snapshot.paramMap.get('id');

    if (!rentalId) {
      return;
    }

    this.rentalService.getRentalDetail(rentalId).subscribe({
      next: rental => {
        this.rental = rental;
      }
    });
  }

  buildStorageUrl(): string {
    return `${this.storageUrl}/${this.rental?.item.thumbnailKey}`
  }
}
