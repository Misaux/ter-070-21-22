import {Body, Controller, Get, Post} from '@nestjs/common';
import {ReaderTextService} from '../services/reader-text.service';
import {ReaderAudioService} from '../services/reader-audio.service';
import {ReaderImageService} from '../services/reader-image.service';
import {ReaderVideoService} from '../services/reader-video.service';
import {RenderGateway} from 'src/websocket/render.gateway';
import {EntryPointDTO} from '../dtos/entry.dto';
import {FileFormat} from '../utils/file-format.util';
import { DataRetriever } from '../services/retrieve-data.service';
import { HtmlObjectDto } from '../dtos/html-object.dto';
import { v4 as uuidv4 } from 'uuid' //Random uuid generator

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
    let resultTags: string
    console.log(request);

    // //Retrieve Data from the service of the user (url given in the JSON)
    // const response: string = await this.dataRetriever.getDataFromService(request);
    // console.log(response);

    //Create corresponding tags according to the format and strategy
    switch (request.fileFormat){
      case FileFormat.TEXT:
        resultTags = this.readerTextService.createTags(await this.dataRetriever.getDataFromService(request));
        break;
      case FileFormat.IMAGE:
        resultTags = this.readerImageService.createTags(await this.dataRetriever.getDataFromService(request));
        break;
      case FileFormat.AUDIO:
        break;
      case FileFormat.VIDEO:
        resultTags = this.readerVideoService.createTags(request.url);
        break;
    }

    //Send data to the gateway for the front-end
    console.log(resultTags);
    const hmtlResDto: HtmlObjectDto = {
      id: uuidv4(), //v4: Create a random unique uuid
      html: resultTags,
    }
    await this.gatewayWebSocket.render(hmtlResDto);
  }

  @Post()
  postWebMessage(@Body() htmlObjectDto: HtmlObjectDto ) {
    this.gatewayWebSocket.render(htmlObjectDto);
  }
}
