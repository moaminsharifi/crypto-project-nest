import { ApiProperty } from '@nestjs/swagger';

export class CryptoCurrency {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  description: string | null;

  @ApiProperty()
  last_trade_price: number;

  @ApiProperty()
  last_trade_date: Date | null;

  @ApiProperty()
  created_at: Date;
}
