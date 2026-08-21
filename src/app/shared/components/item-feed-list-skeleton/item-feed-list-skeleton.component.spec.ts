import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemFeedListSkeletonComponent } from './item-feed-list-skeleton.component';

describe('ItemFeedListSkeletonComponent', () => {
  let component: ItemFeedListSkeletonComponent;
  let fixture: ComponentFixture<ItemFeedListSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemFeedListSkeletonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemFeedListSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
