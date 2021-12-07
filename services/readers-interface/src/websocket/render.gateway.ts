import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
  } from '@nestjs/websockets';
  import { Server } from 'socket.io';
import { HtmlObjectDto } from '../dtos/html-object.dto';

  @WebSocketGateway({
        cors: {
          origin: '*',
        },
      })
  export class RenderGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server:Server;
    users: number = 0;
    async handleConnection() {
      // A client has connected
      this.users++;
      // Notify connected clients of current users
      this.server.emit('users', this.users);
    }
    async handleDisconnect() {
      // A client has disconnected
      this.users--;
      // Notify connected clients of current users
      this.server.emit('users', this.users);
    }

    async render(message: HtmlObjectDto) {
      this.server.emit('render', message);
    }
  }