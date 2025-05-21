import {
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class WebsocketGateway {
  @WebSocketServer()
  server: Server;
  

  emitTransaction(transaction: any) {
    if (!transaction?.portafolio?.id) {
      console.warn('❗ No se pudo emitir: portafolio.id está undefined');
      return;
    }

    this.server.emit('transaction_created', {
      portafolioId: transaction.portafolio.id,
      asset: transaction.asset,
      amount: transaction.amount,
      type: transaction.type,
      usdValue: transaction.usdValue,
      createdAt: transaction.createdAt,
    });
  }
  

}


