import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemAdminManagementComponent } from './item-admin-management.component';

describe('ItemAdminManagementComponent', () => {
  let component: ItemAdminManagementComponent;
  let fixture: ComponentFixture<ItemAdminManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemAdminManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemAdminManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
