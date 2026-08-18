import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LateRentalComponent } from './late-rental.component';

describe('LateRentalComponent', () => {
  let component: LateRentalComponent;
  let fixture: ComponentFixture<LateRentalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LateRentalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LateRentalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
