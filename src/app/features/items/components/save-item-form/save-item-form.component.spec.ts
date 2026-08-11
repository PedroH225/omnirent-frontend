import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveItemFormComponent } from './save-item-form.component';

describe('SaveItemFormComponent', () => {
  let component: SaveItemFormComponent;
  let fixture: ComponentFixture<SaveItemFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaveItemFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
