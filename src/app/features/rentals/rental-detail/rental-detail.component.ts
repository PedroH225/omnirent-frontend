import { Component } from '@angular/core';
import { RentalDetailModel } from '../model/rental-detail-model';
import { ActivatedRoute, Router } from '@angular/router';
import { RentalService } from '@core/rental/rental.service';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { ConfirmRentalComponent } from "../components/actions/confirm-rental/confirm-rental.component";
import { ConfirmationService, MessageService } from 'primeng/api';
import { Toast } from "primeng/toast";
import { UserService } from '@core/user/user.service';
import { Button } from "primeng/button";
import { CancelRentalComponent } from "../components/actions/cancel-rental/cancel-rental.component";
import { EnumOption } from '@shared/models/EnumOption';

@Component({
  selector: 'app-rental-detail',
  imports: [CommonModule, ConfirmRentalComponent, Toast, CancelRentalComponent],
  providers: [ConfirmationService],
  templateUrl: './rental-detail.component.html',
  styleUrl: './rental-detail.component.scss'
})
export class RentalDetailComponent {
  storageUrl = environment.storageUrl;

  rental: RentalDetailModel | null = null;

  rentalStatus: EnumOption[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private rentalService: RentalService,
    private userService: UserService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.loadRental();
    this.getRentalEnums();

    this.checkPaymentResult();
  }

  private getRentalEnums() {
    this.rentalService.getRentalEnums().subscribe({
      next: (response) => {
        this.rentalStatus = response.rentalStatuses;
      },
      error: (error) => {
        console.error(error);
      }
    })
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

  private checkPaymentResult(): void {
    const success = this.route.snapshot.queryParamMap.get('success');

    if (success === 'true') {
      this.messageService.add({
        severity: 'success',
        summary: 'Payment',
        detail: 'Payment completed successfully.'
      });
    }

    if (success === 'false') {
      this.messageService.add({
        severity: 'info',
        summary: 'Payment cancelled',
        detail: 'The payment was cancelled.'
      });
    }
  }

  isOwner(): boolean {
    return this.userService.currentUser()?.id === this.rental?.owner.id;
  }

  onRentalStatusChanged(status: string): void {
    if (this.rental) {
      this.rental.rentalStatus = status;
    }
  }

  getRentalStatusLabel(): string {
    const rental = this.rental;

    if (!rental) {
      return '';
    }

    return this.rentalStatus.find(
      status => status.code === rental.rentalStatus
    )?.label ?? rental.rentalStatus;
  }

  buildStorageUrl(): string {
    return `${this.storageUrl}/${this.rental?.item.thumbnailKey}`
  }
}
