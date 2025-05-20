import { Body, Get, Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GetUser } from 'src/auth/get-user.decorator';
import { Repository } from 'typeorm';
import { Portafolio } from './portafolio.entity';
import { User } from 'src/users/users.entity';

@Injectable()
export class PortafoliosService {
  service: any;
  constructor(@InjectRepository(Portafolio) private repo: Repository<Portafolio>) {}

  @Post()
  create(user: User, data: { name: string }) {
    const portafolio = this.repo.create({ name: data.name, user });
    return this.repo.save(portafolio);
  }

  @Get()
  findAllByUser(userId: string) {
    return this.repo.find({
      where: { user: { id: userId } },
      relations: { transactions: true },
    });
  }

  @Get()
  async getTotalValue(id: string): Promise<number> {
    const portafolio = await this.repo.findOne({
      where: { id },
      relations: { transactions: true },
    });
    

    return portafolio!  .transactions.reduce((acc, t) => acc + t.usdValue, 0);
  }
}
