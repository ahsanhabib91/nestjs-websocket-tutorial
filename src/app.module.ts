import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppGateway } from './app.gateway';
import { ChatGateway } from './chat/chat.gateway';
import { AlertGateway } from './alert/alert.gateway';
import { AlertController } from './alert/alert.controller';

@Module({
  imports: [],
  controllers: [AppController, AlertController],
  providers: [AppService, AppGateway, ChatGateway, AlertGateway],
})
export class AppModule {}
