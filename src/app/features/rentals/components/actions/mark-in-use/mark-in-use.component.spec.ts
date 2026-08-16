import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkInUseComponent } from './mark-in-use.component';

describe('MarkInUseComponent', () => {
  let component: MarkInUseComponent;
  let fixture: ComponentFixture<MarkInUseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarkInUseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarkInUseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
