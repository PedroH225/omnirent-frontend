import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalListItemComponent } from './rental-list-item.component';

describe('RentalListItemComponent', () => {
  let component: RentalListItemComponent;
  let fixture: ComponentFixture<RentalListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentalListItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentalListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
