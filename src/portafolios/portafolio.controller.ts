import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { GetUser } from '../auth/get-user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PortafoliosService } from './portafolio.service';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { CreatePortfolioDto } from './dto/portafolio.dto';

@Controller('portafolio')
@UseGuards(JwtAuthGuard)
export class PortafoliosController {
  constructor(private service: PortafoliosService) {}

  @Post()
  @ApiBody({ type: CreatePortfolioDto }) // 👈 Para mostrar el form en Swagger
  create(@GetUser('id') userId: string, @Body() dto: CreatePortfolioDto) {
    return this.service.create({ id: userId } as any, dto);
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
