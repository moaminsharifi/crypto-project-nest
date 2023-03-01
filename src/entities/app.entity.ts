import { ApiProperty } from '@nestjs/swagger';

export class App {
  @ApiProperty()
  status: 'Healthy' | 'Fail';

  @ApiProperty()
  date: Date;
}
