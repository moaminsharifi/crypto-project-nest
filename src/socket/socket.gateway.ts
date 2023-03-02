import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WsResponse,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { SocketService } from './socket.service';
import { Logger } from '@nestjs/common';
import { WsHealthCheck } from './entities/ws-health-check.entity';

@WebSocketGateway()
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger: Logger = new Logger('SocketGateway');

  constructor(private readonly socketService: SocketService) {}

  /*
    Action:
      - Add socket initial log 
      - Enable on-demand priceList emiter interval
  */
  afterInit(server: Server) {
    // Insert log ( just at initial server )
    this.logger.log(`Socket Gateway initialed`);

    // Start priceList Emiter interval
    setInterval(async () => {
      const prices = await this.socketService.insertFakeTrades();
      server.emit('priceList', prices);
    }, parseInt(process.env.WS_PRICE_EMITER_DELAY) || 2000);
  }

  /*
    Action:
      - Add log for new client connected
  */
  handleConnection(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  /*
    Action:
      - Add log for client disconnected
  */
  handleDisconnect(client: Socket) {
    this.logger.log(`Client Connected: ${client.id}`);
  }

  /*
    Action:
      - Fire up socket health check message as `healthCheck`
      - Response ws message as emit on `healthCheckResponse`
  */
  @SubscribeMessage('healthCheck')
  handleMessage(client: Socket, payload: string): WsResponse<WsHealthCheck> {
    return {
      event: 'healthCheckResponse',
      data: {
        status: 'Healthy',
        clientId: client.id,
        date: new Date(),
        payload,
      },
    };
  }
}
