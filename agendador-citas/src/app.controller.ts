import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CalendarService } from './calendar.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    // private readonly _calendarAPI: CalendarService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


}
