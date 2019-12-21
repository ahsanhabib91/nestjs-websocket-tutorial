import { SubscribeMessage, WebSocketGateway, OnGatewayInit, WsResponse, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

@WebSocketGateway()
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

	@SubscribeMessage('messageToServre')
	handleMessage(client: Socket, payload: any): WsResponse<string> {
		// this.wss.emit('messageToClient', payload); // send data to every client
		// client.emit('messageToClient', payload); // send data to client socket only
		return { event: 'messageToClient', data: payload }; // send data to client socket only
	}
}
