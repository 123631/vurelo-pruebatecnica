import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Portafolio } from '../portafolios/portafolio.entity';
import { WebsocketModule } from '../websocket/websocket.module';
import { Transaction } from './transaction.entity';
import { TransactionsController } from './transaction.controller';
import { TransactionsService } from './transaction.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction, Portafolio]),
    WebsocketModule,
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
