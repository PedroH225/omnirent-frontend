import { Component, HostListener } from '@angular/core';
import { TimelineModule } from 'primeng/timeline';

@Component({
  selector: 'app-time-line',
  imports: [TimelineModule],
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
      title: 'Browse',
      description: 'Explore equipment available for rent.'
    },
    {
      icon: 'pi pi-calendar',
      title: 'Book',
      description: 'Choose your rental period.'
    },
    {
      icon: 'pi pi-check-circle',
      title: 'Confirm',
      description: 'Wait for the owner approval.'
    },
    {
      icon: 'pi pi-box',
      title: 'Rent',
      description: 'Pick up the equipment and enjoy.'
    }
  ];
}
