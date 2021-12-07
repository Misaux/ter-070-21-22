import {Body, Controller, Get, Post} from '@nestjs/common';
import {ReaderTextService} from '../services/reader-text.service';
import {ReaderAudioService} from '../services/reader-audio.service';
import {ReaderImageService} from '../services/reader-image.service';
import {ReaderVideoService} from '../services/reader-video.service';
import {RenderGateway} from 'src/websocket/render.gateway';
import {EntryPointDTO} from '../dtos/entry.dto';
import {FileFormat} from '../utils/file-format.util';
import { DataRetriever } from '../services/retrieve-data.service';
import {HtmlObjectDto} from "../dtos/html-object.dto";

@Controller()
export class ReadersController {

  constructor(private readonly readerTextService: ReaderTextService,
              private readonly readerAudioService: ReaderAudioService,
              private readonly readerImageService: ReaderImageService,
              private readonly readerVideoService: ReaderVideoService,
              private readonly dataRetriever: DataRetriever,
              private readonly gatewayWebSocket: RenderGateway
  ) {}

  @Get()
  getNull(): string {
    return null;
  }

  @Post('/new')
  async getConfigFromUser(@Body() request: EntryPointDTO) {
    console.log(request);

    switch (request.fileFormat){
      case FileFormat.TEXT:
        break;
      case FileFormat.IMAGE:
        break;
      case FileFormat.AUDIO:
        break;
      case FileFormat.VIDEO:
        break;
    }

    const response = await this.dataRetriever.getDataFromService(request);
    console.log(response);
  }

  @Post()
  postWebMessage(@Body() htmlObjectDto: HtmlObjectDto ) {
    this.gatewayWebSocket.render(htmlObjectDto);
  }
}
