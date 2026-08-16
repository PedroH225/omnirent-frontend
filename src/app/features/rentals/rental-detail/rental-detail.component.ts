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
import { CancelRentalComponent } from "../components/actions/cancel-rental/cancel-rental.component";
import { EnumOption } from '@shared/models/EnumOption';
import { PrepareItemComponent } from "../components/actions/prepare-item/prepare-item.component";
import { RentalTimelineComponent } from "../components/rental-time-line/rental-time-line.component";
import { ShipItemComponent } from "../components/actions/ship-item/ship-item.component";
import { HttpErrorResponse } from '@angular/common/http';
import { MarkInUseComponent } from "../components/actions/mark-in-use/mark-in-use.component";
import { RentalDisplayModel } from '../model/rental-display-model';
import { RequestReturnComponent } from "../components/actions/request-return/request-return.component";

@Component({
  selector: 'app-rental-detail',
  imports: [CommonModule, ConfirmRentalComponent, Toast, CancelRentalComponent, PrepareItemComponent, RentalTimelineComponent, ShipItemComponent, MarkInUseComponent, RequestReturnComponent],
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

  onRentalInUse(event: RentalDisplayModel): void {
    if (!this.rental) {
      return;
    }

    this.rental.rentalStatus = event.rentalStatus;
    this.rental.startDate = event.startDate;
    this.rental.endDate = event.endDate;
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
