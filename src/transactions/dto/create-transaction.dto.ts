import { IsNotEmpty, IsNumber, IsUUID, IsIn } from 'class-validator';

export class CreateTransactionDto {
  @IsUUID()
  portfolioId: string;

  @IsNotEmpty()
  asset: string;

  @IsNumber()
  amount: number;

  @IsIn(['deposit', 'withdraw'])
  type: 'deposit' | 'withdraw';
}
