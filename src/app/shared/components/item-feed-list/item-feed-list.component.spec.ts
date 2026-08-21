import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemFeedListComponent } from './item-feed-list.component';

describe('ItemFeedListComponent', () => {
  let component: ItemFeedListComponent;
  let fixture: ComponentFixture<ItemFeedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemFeedListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemFeedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
