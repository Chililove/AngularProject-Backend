import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatService } from '../core/services/chat.service';
import { IChatServiceProvider } from '../core/primary-ports/chat.service.interface';

@Module({
  providers: [
    ChatGateway,
    {
      provide: IChatServiceProvider,
      useClass: ChatService,
    },
  ],
})
export class ChatModule {}
