import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmRentalComponent } from './confirm-rental.component';

describe('ConfirmRentalComponent', () => {
  let component: ConfirmRentalComponent;
  let fixture: ComponentFixture<ConfirmRentalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmRentalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmRentalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
