import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    MessageBody,
  } from '@nestjs/websockets';
  import { Server } from 'socket.io';
import { AggregatorService } from '../services/aggregator.service';
import { PersistanceService } from '../services/persistance.service';
import { HtmlObjectDto } from '../dtos/html-object.dto';
import { forwardRef, Inject } from '@nestjs/common';
  @WebSocketGateway({
        cors: {
          origin: '*',
        },
      })
  export class RenderGateway implements OnGatewayConnection, OnGatewayDisconnect {

    constructor(                @Inject(forwardRef(() => AggregatorService))
    private readonly aggregatorService: AggregatorService,
      private readonly persistanceService: PersistanceService) {}

    @WebSocketServer() server:Server;
    async handleConnection() {
      console.log("websocket connected")
    }
    async handleDisconnect() {
      console.log("websocket disconnected")

    }
    @SubscribeMessage('refresh')
    handleEvent(@MessageBody() data: any) {
      console.log("page refresh")
      this.aggregatorService.renderMultiAggregate(this.persistanceService.readData());
    }

    async render(message: HtmlObjectDto) {
      this.server.emit('render', message);
    }
  }