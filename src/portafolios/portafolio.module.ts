import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortafoliosController } from './portafolio.controller';
import { Portafolio } from './portafolio.entity';
import { PortafoliosService } from './portafolio.service';

@Module({
  imports: [TypeOrmModule.forFeature([Portafolio])],
  providers: [PortafoliosService],
  controllers: [PortafoliosController],
  exports: [PortafoliosService],
})
export class PortafoliosModule {}
