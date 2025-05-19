import {
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Transaction } from '../transactions/transaction.entity';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class WebsocketGateway {
  @WebSocketServer()
  server: Server;

  emitTransaction(transaction: Transaction) {
    this.server.emit('transaction_created', {
      portfolioId: transaction.portafolio.id,
      asset: transaction.asset,
      amount: transaction.amount,
      type: transaction.type,
      usdValue: transaction.usdValue,
      createdAt: transaction.createdAt,
    });
  }
}
