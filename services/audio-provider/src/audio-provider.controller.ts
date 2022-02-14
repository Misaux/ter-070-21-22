import { Controller, Get, Param, Req, Res } from '@nestjs/common';
import { AudioProviderService } from './audio-provider.service';
import { Response,Request } from 'express'

@Controller("audio")
export class AudioProviderController {
  constructor(private readonly audioProviderService: AudioProviderService) {}

  @Get(":title")
  getAudio(@Req() request: Request,
           @Res() response: Response,
           @Param("title") title,) {
    this.audioProviderService.getAudio(request, response, title);
  }
}
