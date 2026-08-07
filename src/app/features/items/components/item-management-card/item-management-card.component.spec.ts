import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemManagementCardComponent } from './item-management-card.component';

describe('ItemManagementCardComponent', () => {
  let component: ItemManagementCardComponent;
  let fixture: ComponentFixture<ItemManagementCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemManagementCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemManagementCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
