import { Controller, Get } from '@nestjs/common';
import { ReaderTextService } from '../services/reader-text.service';
import { ReaderAudioService } from '../services/reader-audio.service';
import { ReaderImageService } from '../services/reader-image.service';
import { ReaderVideoService } from '../services/reader-video.service';

@Controller()
export class ReadersController {

  constructor(private readonly readerTextService: ReaderTextService,
              private readonly readerAudioService: ReaderAudioService,
              private readonly readerImageService: ReaderImageService,
              private readonly readerVideoService: ReaderVideoService
  ) {}

  @Get()
  getNull(): string {
    return null;
  }
}
