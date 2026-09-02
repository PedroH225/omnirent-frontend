import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslatePipe } from '@core/i18n/translation-pipe';
import { RentalService } from '@core/rental/rental.service';
import { RentalDisplayModel } from '@features/rentals/model/rental-display-model';
import { RentalOperationalModel } from '@features/rentals/model/rental-operational-model ';
import { Button } from "primeng/button";

@Component({
  selector: 'app-mark-in-use',
  imports: [CommonModule, Button, TranslatePipe],
  templateUrl: './mark-in-use.component.html',
  styleUrl: './mark-in-use.component.scss'
})
export class MarkInUseComponent {
  @Input() rentalId!: string;

  @Input() isOwner!: boolean;

  rentalOp!: RentalOperationalModel;

  @Output() rentalInUse = new EventEmitter<RentalDisplayModel>()

  constructor(private rentalService: RentalService) { }

  ngOnInit(): void {
    this.loadOperationalData();
  }

  loadOperationalData(): void {
    if (!this.rentalId) {
      return;
    }

    this.rentalService.getOperationalData(this.rentalId).subscribe({
      next: (response) => {
        this.rentalOp = response;
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
      }
    });
  }

  simulateDelivery(): void {
    if (!this.rentalId) {
      return;
    }

    this.rentalService.markInUse(this.rentalId).subscribe({
      next: (response) => {
        this.rentalInUse.emit(response);
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
        
      }
    })
  }

  getEstimatedDelivery(): Date | null {
    if (!this.rentalOp?.updatedAt) {
      return null;
    }

    return new Date(
      new Date(this.rentalOp.updatedAt).getTime() + 60 * 60 * 1000
    );
  }
}
