import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Portafolio } from '../portafolios/portafolio.entity';

export type TransactionType = 'deposit' | 'withdraw';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  asset: string;

  @Column('decimal')
  amount: number;

  @Column({ type: 'decimal' })
  usdValue: number;

  @Column()
  type: TransactionType;

  @ManyToOne(() => Portafolio, (portafolio) => portafolio.transactions, { onDelete: 'CASCADE' })
  portafolio: Portafolio;

  @CreateDateColumn()
  createdAt: Date;
}
