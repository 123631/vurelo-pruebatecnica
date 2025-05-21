import { BadRequestException, Body, Get, Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  @Post()
  async create(@Body() dto: CreateUserDto): Promise<User> {
    const existing = await this.repo.findOne({
      where: [{ email: dto.email }, { name: dto.name }],
    });

    if (existing) {
      throw new BadRequestException('Ya existe un usuario con ese nombre o email');
    }

    const hashed = await bcrypt.hash(dto.password, 10);
    const user = this.repo.create({ ...dto, password: hashed });
    return this.repo.save(user);
  }

  @Get()
  async findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  @Get()
  async findById(id: string) {
    return this.repo.findOne({
      where: { id },
      relations: { portafolio: { transactions: true } },
    });
  }
}
