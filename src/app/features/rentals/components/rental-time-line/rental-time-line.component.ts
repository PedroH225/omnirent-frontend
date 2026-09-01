import { Component, Input } from '@angular/core';
import { TranslatePipe } from '@core/i18n/translation-pipe';

interface RentalTimelineStage {
  code: string;
  label: string;
  statuses: string[];
}

@Component({
  selector: 'app-rental-timeline',
  imports: [TranslatePipe],
  templateUrl: './rental-time-line.component.html',
  styleUrl: './rental-time-line.component.scss',
})
export class RentalTimelineComponent {
  @Input() rentalStatus!: string;

  readonly stages: RentalTimelineStage[] = [
    {
      code: 'RENTAL',
      label: 'rental.timeline.rental',
      statuses: ['CREATED', 'CONFIRMED'],
    },
    {
      code: 'PREPARATION',
      label: 'rental.timeline.preparation',
      statuses: ['PREPARING', 'SHIPPED'],
    },
    {
      code: 'IN_USE',
      label: 'rental.timeline.in_use',
      statuses: ['IN_USE'],
    },
    {
      code: 'RETURN',
      label: 'rental.timeline.return',
      statuses: ['RETURN_REQUESTED', 'RETURN_SHIPPED', 'RETURNED'],
    },
  ];

  get currentStageIndex(): number {
    return this.stages.findIndex((stage) =>
      stage.statuses.includes(this.rentalStatus),
    );
  }

  isActive(index: number): boolean {
    if (this.rentalStatus === 'RETURNED') {
      return false;
    }

    return index === this.currentStageIndex;
  }

  isCompleted(index: number): boolean {
    if (this.rentalStatus === 'RETURNED') {
      return index <= this.currentStageIndex;
    }

    return index < this.currentStageIndex;
  }

  getOverallProgress(): number {
    const progress: Record<string, number> = {
      CREATED: 0,
      CONFIRMED: 16.67,

      PREPARING: 33.33,
      SHIPPED: 50,

      IN_USE: 66.67,

      RETURN_REQUESTED: 77.78,
      RETURN_SHIPPED: 88.89,
      RETURNED: 100,
    };

    return progress[this.rentalStatus] ?? 0;
  }
}
