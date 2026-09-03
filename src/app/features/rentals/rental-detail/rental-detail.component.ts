import { Component } from '@angular/core';
import { RentalDetailModel } from '../model/rental-detail-model';
import { ActivatedRoute, Router } from '@angular/router';
import { RentalService } from '@core/rental/rental.service';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { ConfirmRentalComponent } from '../components/actions/confirm-rental/confirm-rental.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { UserService } from '@core/user/user.service';
import { CancelRentalComponent } from '../components/actions/cancel-rental/cancel-rental.component';
import { EnumOption } from '@shared/models/EnumOption';
import { PrepareItemComponent } from '../components/actions/prepare-item/prepare-item.component';
import { RentalTimelineComponent } from '../components/rental-time-line/rental-time-line.component';
import { ShipItemComponent } from '../components/actions/ship-item/ship-item.component';
import { HttpErrorResponse } from '@angular/common/http';
import { MarkInUseComponent } from '../components/actions/mark-in-use/mark-in-use.component';
import { RentalDisplayModel } from '../model/rental-display-model';
import { RequestReturnComponent } from '../components/actions/request-return/request-return.component';
import { ShipReturnComponent } from '../components/actions/ship-return/ship-return.component';
import { MarkReturnedComponent } from '../components/actions/mark-returned/mark-returned.component';
import { ReturnedComponent } from '../components/actions/returned/returned.component';
import { LateRentalComponent } from '../components/actions/late-rental/late-rental.component';
import { TranslatePipe } from '@core/i18n/translation-pipe';
import { TranslationService } from '@core/i18n/translation.service';

@Component({
  selector: 'app-rental-detail',
  imports: [
    CommonModule,
    ConfirmRentalComponent,
    Toast,
    CancelRentalComponent,
    PrepareItemComponent,
    RentalTimelineComponent,
    ShipItemComponent,
    MarkInUseComponent,
    RequestReturnComponent,
    ShipReturnComponent,
    MarkReturnedComponent,
    ReturnedComponent,
    LateRentalComponent,
    TranslatePipe,
  ],
  providers: [ConfirmationService],
  templateUrl: './rental-detail.component.html',
  styleUrl: './rental-detail.component.scss',
})
export class RentalDetailComponent {
  canCancel = true;
  storageUrl = environment.storageUrl;

  rental: RentalDetailModel | null = null;

  rentalStatus: EnumOption[] = [];

  constructor(
    private route: ActivatedRoute,
    private rentalService: RentalService,
    private userService: UserService,
    private translationService: TranslationService,
  ) {}

  ngOnInit(): void {
    this.loadRental();
    this.getRentalEnums();
  }

  private getRentalEnums() {
    this.rentalService.getRentalEnums().subscribe({
      next: (response) => {
        this.rentalStatus = response.rentalStatuses;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  private loadRental(): void {
    const rentalId = this.route.snapshot.paramMap.get('id');

    if (!rentalId) {
      return;
    }

    this.rentalService.getRentalDetail(rentalId).subscribe({
      next: (rental) => {
        this.rental = rental;
      },
    });
  }

  reloadOperationalData(): void {
    if (!this.rental) {
      return;
    }

    this.rentalService.getOperationalData(this.rental.id).subscribe({
      next: (response) => {
        if (this.rental) {
          this.rental.startDate = response.startDate;
          this.rental.endDate = response.endDate;
          this.rental.rentalStatus = response.status;
          this.rental.updatedAt = response.updatedAt;
        }
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
      },
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

  onRentalRenew() {
    if (!this.rental) {
      return;
    }
    this.reloadOperationalData();
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

    return this.translationService.translate(
      this.rentalStatus.find((status) => status.code === rental.rentalStatus)
        ?.code ?? rental.rentalStatus,
    );
  }

  handleCanCancel($event: boolean) {
    this.canCancel = $event;
  }

  buildStorageUrl(): string {
    return `${this.storageUrl}/${this.rental?.item.thumbnailKey}`;
  }
}
