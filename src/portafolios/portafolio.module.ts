import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortfoliosController } from './portafolio.controller';
import { Portafolio } from './portafolio.entity';
import { PortfoliosService } from './portafolio.service';

@Module({
  imports: [TypeOrmModule.forFeature([Portafolio])],
  providers: [PortfoliosService],
  controllers: [PortfoliosController],
  exports: [PortfoliosService],
})
export class PortfoliosModule {}
