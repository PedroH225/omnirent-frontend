import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalTimeLineComponent } from './rental-time-line.component';

describe('RentalTimeLineComponent', () => {
  let component: RentalTimeLineComponent;
  let fixture: ComponentFixture<RentalTimeLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentalTimeLineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentalTimeLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
