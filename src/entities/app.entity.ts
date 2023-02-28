import { ApiProperty } from '@nestjs/swagger';

export class app {
  @ApiProperty()
  status: 'healthy' | 'fail';

  @ApiProperty()
  created_at: Date;
}
