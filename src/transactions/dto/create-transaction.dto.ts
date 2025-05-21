import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsUUID, IsIn } from 'class-validator';

export class CreateTransactionDto {

  @ApiProperty({ example: '8ab1103e-14b8-...' })
  @IsUUID()
  portafolioId: string;

  @ApiProperty({ example: 'Bitcoin.' })
  @IsNotEmpty()
  asset: string;

  @ApiProperty({ example: 0.01 })
  @IsNumber()
  amount: number;

  @ApiProperty({ example: 'deposit' })
  @IsIn(['deposit', 'withdraw'])
  type: 'deposit' | 'withdraw';
}
