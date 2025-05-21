import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePortfolioDto {
  @IsString()
  @ApiProperty({ example: 'Mi portafolio' })
  name: string;
}