import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Length } from 'class-validator';

export class CreateCryptoCurrencyDto {
  @ApiProperty({ example: 'kiarash', maxLength: 10, minLength: 3 })
  @Length(3, 10)
  name: string;

  @ApiProperty({ example: 'kiarashatri@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({
    required: false,
    example: 'sample description',
    maxLength: 512,
    minLength: 3,
  })
  @Length(3, 512)
  description?: string;
}
