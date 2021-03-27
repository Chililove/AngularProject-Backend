import { Module } from '@nestjs/common';
import { ChatModule } from './chat/api/chat.module';

@Module({
  imports: [ChatModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
