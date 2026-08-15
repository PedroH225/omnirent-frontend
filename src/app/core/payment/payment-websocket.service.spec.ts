import { TestBed } from '@angular/core/testing';

import { PaymentWebsocketService } from './payment-websocket.service';

describe('PaymentWebsocketService', () => {
  let service: PaymentWebsocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentWebsocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
