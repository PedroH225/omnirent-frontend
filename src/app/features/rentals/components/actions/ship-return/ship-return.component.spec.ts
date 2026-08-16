import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipReturnComponent } from './ship-return.component';

describe('ShipReturnComponent', () => {
  let component: ShipReturnComponent;
  let fixture: ComponentFixture<ShipReturnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShipReturnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShipReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
