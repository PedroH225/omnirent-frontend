import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemFeedCardSkeletonComponent } from './item-feed-card-skeleton.component';

describe('ItemFeedCardSkeletonComponent', () => {
  let component: ItemFeedCardSkeletonComponent;
  let fixture: ComponentFixture<ItemFeedCardSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemFeedCardSkeletonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemFeedCardSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
