import { Controller, Get, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response,Request } from 'express'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getVideo(@Req() request: Request,
  @Res() response: Response,) {
    this.appService.getVideo(request, response);
  }
}
