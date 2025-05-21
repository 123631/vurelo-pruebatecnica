import { Get, Injectable, NotFoundException, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Repository } from 'typeorm';
import { Portafolio } from '../portafolios/portafolio.entity';
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

  @Post()
  async create(dto: CreateTransactionDto) {
    const portafolio = await this.pfRepo.findOne({
      where: { id: dto.portafolioId },
      relations: ['user'],
    });
    if (!portafolio) throw new NotFoundException('Portafolio no encontrado');

    const price = await this.getUSDPrice(dto.asset.toLowerCase());
    const usdValue = +dto.amount * price;
  
    const transaction = this.txRepo.create({
      asset: dto.asset,
      amount: dto.amount,
      type: dto.type,
      usdValue,
      portafolio, // asegúrate que este sea el campo correcto
    });

    const savedTx = await this.txRepo.save(transaction);

    // 🔁 Recargar con relaciones
    const fullTx = await this.txRepo.findOne({
      where: { id: savedTx.id },
      relations: ['portafolio'],
    });

    console.log('🔍 Transacción que se va a emitir:', transaction);
    this.wsGateway.emitTransaction(transaction);

    return savedTx;
    
  }


  @Get()
  async findByPortafolio(portafolioId: string) {
    return this.txRepo.find({
      where: { portafolio: { id: portafolioId } },
      relations: ['portafolio'],
    });
  }

  @Get()
  private async getUSDPrice(asset: string): Promise<number> {
    const { data } = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${asset}&vs_currencies=usd`,
    );
    return data[asset]?.usd ?? 0;
  }
}
