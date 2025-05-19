import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../auth/get-user.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.service.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  find(@Param('id') id: string, @GetUser('id') userId: string) {
    if (id !== userId) throw new Error('Unauthorized');
    return this.service.findById(id);
  }
}
