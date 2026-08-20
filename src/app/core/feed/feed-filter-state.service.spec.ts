import { TestBed } from '@angular/core/testing';

import { FeedFilterStateService } from './feed-filter-state.service';

describe('FeedFilterStateService', () => {
  let service: FeedFilterStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeedFilterStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
