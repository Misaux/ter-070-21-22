import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("video")
  getVideo(): string {
    return this.appService.getVideoURL();
  }
  @Get("audio")
  getAudio(): string {
    return this.appService.getAudioURL();
  }

}
