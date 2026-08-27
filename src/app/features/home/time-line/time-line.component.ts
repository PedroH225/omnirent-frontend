import { Component, HostListener } from '@angular/core';
import { TranslatePipe } from '@core/i18n/translation-pipe';
import { TimelineModule } from 'primeng/timeline';

@Component({
  selector: 'app-time-line',
  imports: [
    TimelineModule,
    TranslatePipe
  ],
  templateUrl: './time-line.component.html',
  styleUrl: './time-line.component.scss'
})
export class TimeLineComponent {

  isMobile = false;

  ngOnInit() {
    this.checkScreenSize();
  }

  @HostListener('window:resize')
  checkScreenSize() {
    this.isMobile = window.innerWidth <= 768;
  }

  events = [
    {
      icon: 'pi pi-search',
      title: 'home.howItWorks.steps.browse.title',
      description: 'home.howItWorks.steps.browse.description'
    },
    {
      icon: 'pi pi-calendar',
      title: 'home.howItWorks.steps.book.title',
      description: 'home.howItWorks.steps.book.description'
    },
    {
      icon: 'pi pi-check-circle',
      title: 'home.howItWorks.steps.confirm.title',
      description: 'home.howItWorks.steps.confirm.description'
    },
    {
      icon: 'pi pi-box',
      title: 'home.howItWorks.steps.rent.title',
      description: 'home.howItWorks.steps.rent.description'
    }
  ];
}
