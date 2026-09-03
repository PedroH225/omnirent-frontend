import { Injectable } from '@angular/core';
import { Client, IMessage, StompSubscription } from '@stomp/stompjs';
import { environment } from '../../../environments/environment';
import SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root',
})
export class PaymentWebSocketService {
  private client: Client;
  private subscription?: StompSubscription;

  constructor() {
    this.client = new Client({
      webSocketFactory: () => new SockJS(`${environment.apiUrl}/ws`),

      reconnectDelay: 5000,

      debug: () => {},
    });
  }

  connect(rentalId: string, onMessage: (message: any) => void): void {
    this.client.onConnect = () => {
      this.subscription = this.client.subscribe(
        `/topic/rental/payment/${rentalId}`,
        (message: IMessage) => {
          const response = JSON.parse(message.body);

          onMessage(response);
        },
      );
    };

    this.client.activate();
  }

  connectPaymentUpdate(rentalId: string, onMessage: () => void): void {
    this.client.onConnect = () => {
      this.subscription = this.client.subscribe(
        `/topic/rental/payment-update/${rentalId}`,
        () => {
          onMessage();
        },
      );
    };

    this.client.activate();
  }

  disconnect(): void {
    this.subscription?.unsubscribe();
    this.subscription = undefined;

    this.client.deactivate();
  }
}
