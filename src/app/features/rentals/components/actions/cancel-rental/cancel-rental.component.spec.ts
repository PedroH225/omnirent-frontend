import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelRentalComponent } from './cancel-rental.component';

describe('CancelRentalComponent', () => {
  let component: CancelRentalComponent;
  let fixture: ComponentFixture<CancelRentalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CancelRentalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancelRentalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
