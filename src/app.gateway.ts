import { SubscribeMessage, WebSocketGateway, OnGatewayInit, WsResponse, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

/**
 *	Important URIs:
 *	https://docs.nestjs.com/websockets/gateways
 *	https://socket.io/docs/server-api/
 *	https://socket.io/docs/client-api/
 */

// @WebSocketGateway({serveClient: true})
@WebSocketGateway({namespace: 'app'})
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
	
	private logger: Logger = new Logger('AppGateway');
	@WebSocketServer() wss: Server;

	afterInit(server: Server) {
		this.logger.log('Initialized .....');
	}

	handleConnection(client: Socket, ...args: any[]) {
		this.logger.log(`Client connected: ${client.id}`);
	}

	handleDisconnect(client: Socket) {
		this.logger.log(`Client disconnected: ${client.id}`);
	}

	@SubscribeMessage('msgToServer')
	handleMessage(client: Socket, payload: any): WsResponse<string> {
		this.logger.log(`Message received for ${client.id}`);
		this.logger.log(payload);
		this.wss.emit('msgToClient', payload); // send data to every client
		// client.emit('messageToClient', payload); // send data to client socket only
		return { event: 'msgToClient', data: payload }; // send data to client socket only
	}
}
