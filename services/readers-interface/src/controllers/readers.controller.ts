import { Body, Controller, Get, Post } from '@nestjs/common';
import { RenderGateway } from 'src/websocket/render.gateway';
import { EntryPointDTO } from '../dtos/entry.dto';
import { HtmlObjectDto } from '../dtos/html-object.dto';
import { v4 as uuidv4 } from 'uuid' //Random uuid generator
import { AggregatorService } from '../services/aggregator.service';

@Controller()
export class ReadersController {

  constructor(private readonly gatewayWebSocket: RenderGateway,
              private readonly aggregatorService: AggregatorService
  ) {}

  @Get()
  getNull(): string {
    return null;
  }

  @Post('/new')
  async getConfigFromUser(@Body() request: EntryPointDTO) {
    let resultTags: string
    console.log(request);

    resultTags = await this.aggregatorService.aggregate(request);

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
