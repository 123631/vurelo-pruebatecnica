import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Repository } from 'typeorm';
import { Portafolio } from '../portafolio/portafolio.entity';
import { WebsocketGateway } from '../websocket/websocket.gateway';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from './transaction.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction) private txRepo: Repository<Transaction>,
    @InjectRepository(Portafolio) private pfRepo: Repository<Portafolio>,
    private wsGateway: WebsocketGateway,
  ) {}

  async create(dto: CreateTransactionDto) {
    const portafolio = await this.pfRepo.findOne({
      where: { id: dto.portfolioId },
      relations: ['user'],
    });
    if (!portafolio) throw new NotFoundException('Portafolio not found');

    const price = await this.getUSDPrice(dto.asset.toLowerCase());
    const usdValue = +dto.amount * price;

    const tx = this.txRepo.create({
      ...dto,
      usdValue,
      portafolio,
    });
    const savedTx = await this.txRepo.save(tx);

    this.wsGateway.emitTransaction(savedTx);
    return savedTx;
  }

  async findByPortfolio(portfolioId: string) {
    return this.txRepo.find({
      where: { portafolio: { id: portfolioId } },
      relations: ['portafolio'],
    });
  }

  private async getUSDPrice(asset: string): Promise<number> {
    const { data } = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${asset}&vs_currencies=usd`,
    );
    return data[asset]?.usd ?? 0;
  }
}
