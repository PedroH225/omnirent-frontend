import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemManagementListComponent } from './item-management-list.component';

describe('ItemManagementListComponent', () => {
  let component: ItemManagementListComponent;
  let fixture: ComponentFixture<ItemManagementListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemManagementListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemManagementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
