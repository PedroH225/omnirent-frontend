import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemFeedComponent } from './item-feed.component';

describe('ItemFeedComponent', () => {
  let component: ItemFeedComponent;
  let fixture: ComponentFixture<ItemFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemFeedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
