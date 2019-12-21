import { SubscribeMessage, WebSocketGateway, OnGatewayInit, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({ namespace: 'chat' })
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

	private logger: Logger = new Logger('ChatGateway');
	@WebSocketServer() wss: Server;

	afterInit(server: any) {
		this.logger.log('Initialize ChatGateway!');
	}

	handleConnection(client: Socket, ...args: any[]) {
		this.logger.log(`Client connected: ${client.id}`);
	}

	handleDisconnect(client: Socket) {
		this.logger.log(`Client disconnected: ${client.id}`);
	}

	@SubscribeMessage('chatToServer')
	handleChatMessage(client: Socket, payload: { sender: string, message: string }) {
		this.logger.log(payload);
		this.wss.emit('chatToClient', payload);
	}
}
