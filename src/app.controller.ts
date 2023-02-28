import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { App } from './entities/app.entity';

@ApiTags('Api Health Check')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /*
    Duty: API Health Check
    Method: Get
    Route: /
  */
  @Get()
  @ApiOkResponse({ type: App })
  getHello(): object {
    return {
      status: this.appService.getStatus(),
      date: new Date(),
    };
  }
}
