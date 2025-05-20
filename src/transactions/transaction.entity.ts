import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Portafolio } from '../portafolios/portafolio.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  asset: string;

  @Column('decimal')
  amount: number;

  @Column('decimal')
  usdValue: number;

  @Column()
  type: 'deposit' | 'withdraw';

  @ManyToOne(() => Portafolio, (portafolio) => portafolio.transactions, { onDelete: 'CASCADE' })
  portafolio: Portafolio;

  @CreateDateColumn()
  createdAt: Date;
}
