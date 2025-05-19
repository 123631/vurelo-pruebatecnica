import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { GetUser } from '../auth/get-user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PortfoliosService } from './portafolio.service';

@Controller('portafolio')
@UseGuards(JwtAuthGuard)
export class PortfoliosController {
  constructor(private service: PortfoliosService) {}

  @Post()
  create(@GetUser('id') userId: string, @Body() body: { name: string }) {
    return this.service.create({ id: userId } as any, body.name);
  }

  @Get(':userId')
  findAll(@Param('userId') userId: string, @GetUser('id') reqUserId: string) {
    if (userId !== reqUserId) throw new Error('Unauthorized');
    return this.service.findAllByUser(userId);
  }

  @Get(':id/value')
  getValue(@Param('id') id: string) {
    return this.service.getTotalValue(id);
  }
}
