import { Component } from '@angular/core';
import { RentalDetailModel } from '../model/rental-detail-model';
import { ActivatedRoute, Router } from '@angular/router';
import { RentalService } from '@core/rental/rental.service';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { ConfirmRentalComponent } from "../components/actions/confirm-rental/confirm-rental.component";
import { MessageService } from 'primeng/api';
import { Toast } from "primeng/toast";
import { UserService } from '@core/user/user.service';

@Component({
  selector: 'app-rental-detail',
  imports: [CommonModule, ConfirmRentalComponent, Toast],
  providers: [],
  templateUrl: './rental-detail.component.html',
  styleUrl: './rental-detail.component.scss'
})
export class RentalDetailComponent {
  storageUrl = environment.storageUrl;

  rental: RentalDetailModel | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private rentalService: RentalService,
    private userService: UserService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.loadRental();
    this.checkPaymentResult();
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

  onPaymentExpired(): void {
    this.loadRental();
  }

  buildStorageUrl(): string {
    return `${this.storageUrl}/${this.rental?.item.thumbnailKey}`
  }
}
