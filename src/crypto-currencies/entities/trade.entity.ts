import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CryptoCurrency } from './crypto-currency.entity';

@Entity({ name: 'trades' })
export class Trade {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @ManyToOne(() => CryptoCurrency, { onDelete: 'CASCADE' })
  @JoinColumn()
  currency: CryptoCurrency;

  @Column()
  trade_at: Date;
}
