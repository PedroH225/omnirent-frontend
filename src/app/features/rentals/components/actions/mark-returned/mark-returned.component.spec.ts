import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkReturnedComponent } from './mark-returned.component';

describe('MarkReturnedComponent', () => {
  let component: MarkReturnedComponent;
  let fixture: ComponentFixture<MarkReturnedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarkReturnedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarkReturnedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
