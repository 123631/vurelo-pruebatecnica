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
  

  emitTransaction(tx: any) {
    if (!tx?.portafolio?.id) {
      console.warn('❗ No se pudo emitir: portafolio.id está undefined');
      return;
    }

    this.server.emit('transaction_created', {
      portafolioId: tx.portafolio.id,
      asset: tx.asset,
      amount: tx.amount,
      type: tx.type,
      usdValue: tx.usdValue,
      createdAt: tx.createdAt,
    });
  }
  

}


