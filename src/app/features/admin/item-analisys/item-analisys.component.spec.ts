import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemAnalisysComponent } from './item-analisys.component';

describe('ItemAnalisysComponent', () => {
  let component: ItemAnalisysComponent;
  let fixture: ComponentFixture<ItemAnalisysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemAnalisysComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemAnalisysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
