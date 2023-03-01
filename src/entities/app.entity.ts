import { ApiProperty } from '@nestjs/swagger';

export class App {
  @ApiProperty({ enum: ['Healthy', 'Fail'] })
  status: 'Healthy' | 'Fail';

  @ApiProperty()
  date: Date;
}
