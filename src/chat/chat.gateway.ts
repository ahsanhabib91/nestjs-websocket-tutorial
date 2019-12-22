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
	handleChatMessage(client: Socket, payload: { sender: string, room: string, message: string }) {
		this.logger.log(payload);
		try { // List of clients connected to a room
			this.wss.in(payload.room).clients((error, clients) => {
				if (error) throw error;
				console.log(clients); // => [Anw2LatarvGVVXEIAAAD]
			});
		} catch(err) {
			console.log(err);
		}
		this.wss.to(payload.room).emit('chatToClient', payload);
	}

	@SubscribeMessage('joinRoom')
	handleJoinRoom(client: Socket, room: string) {
		client.join(room);
		client.emit('joinedRoom', room);
	}

	@SubscribeMessage('leaveRoom')
	handleLeftRoom(client: Socket, room: string) {
		client.leave(room);
		client.emit('leftRoom', room);
	}

}
