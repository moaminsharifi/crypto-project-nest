import { CryptoCurrency } from 'src/crypto-currencies/entities/crypto-currency.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
