import { ApiProperty } from '@nestjs/swagger';

export class CreateCryptoCurrencyDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty({ required: false })
  description?: string;
}
