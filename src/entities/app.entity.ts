import { ApiProperty } from '@nestjs/swagger';

export class App {
  @ApiProperty()
  status: 'Healthy' | 'Fail';

  @ApiProperty()
  created_at: Date;
}
