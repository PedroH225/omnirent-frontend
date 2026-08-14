import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveUserFormComponent } from './save-user-form.component';

describe('SaveUserFormComponent', () => {
  let component: SaveUserFormComponent;
  let fixture: ComponentFixture<SaveUserFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaveUserFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
