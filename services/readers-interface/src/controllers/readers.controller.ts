import { Body, Controller, Get, Post } from '@nestjs/common';
import { PersistanceService } from 'src/services/persistance.service';
import { RenderGateway } from 'src/websocket/render.gateway';
import { EntryPointDTO } from '../dtos/entry.dto';
import { HtmlObjectDto } from '../dtos/html-object.dto';
import { AggregatorService } from '../services/aggregator.service';

@Controller()
export class ReadersController {

  constructor(private readonly gatewayWebSocket: RenderGateway,
              private readonly aggregatorService: AggregatorService,
              private readonly persistenceService: PersistanceService

  ) {}

  @Get()
  getNull(): string {
        return null;
  }

  @Post('/new')
  async getConfigFromUser(@Body() request: EntryPointDTO) {
    this.persistenceService.addData(request);

    await this.aggregatorService.renderAggregate(request)
  }

  @Post()
  postWebMessage(@Body() htmlObjectDto: HtmlObjectDto ) {
    this.gatewayWebSocket.render(htmlObjectDto);
  }
}
