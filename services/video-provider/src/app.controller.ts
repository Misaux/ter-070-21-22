import { Controller, Get, Param, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response,Request } from 'express'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(":title")
  getVideo(@Req() request: Request,
  @Res() response: Response,
  @Param("title") title) {
    this.appService.getVideo(request, response, title);
  }
}
