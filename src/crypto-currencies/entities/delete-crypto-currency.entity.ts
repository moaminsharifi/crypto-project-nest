import { ApiProperty } from '@nestjs/swagger';
import { CryptoCurrency } from './crypto-currency.entity';

export class DeleteCryptoCurrency extends CryptoCurrency {
  @ApiProperty({ default: new Date() })
  deleted_at: Date;
}
