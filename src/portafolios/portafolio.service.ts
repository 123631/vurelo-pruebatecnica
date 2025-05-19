import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/users.entity';
import { Portafolio } from './portafolio.entity';

@Injectable()
export class PortfoliosService {
  constructor(@InjectRepository(Portafolio) private repo: Repository<Portafolio>) {}

  create(user: User, name: string) {
    const Portafolio = this.repo.create({ name, user });
    return this.repo.save(Portafolio);
  }

  findAllByUser(userId: string) {
    return this.repo.find({
      where: { user: { id: userId } },
      relations: { transactions: true },
    });
  }

  async getTotalValue(id: string): Promise<number> {
    const portafolio = await this.repo.findOne({
      where: { id },
      relations: { transactions: true },
    });

    return portafolio.transactions.reduce((acc, t) => acc + t.usdValue, 0);
  }
}
