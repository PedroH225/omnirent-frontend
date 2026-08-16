import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrepareItemComponent } from './prepare-item.component';

describe('PrepareItemComponent', () => {
  let component: PrepareItemComponent;
  let fixture: ComponentFixture<PrepareItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrepareItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrepareItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
