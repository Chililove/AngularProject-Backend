import { Injectable } from '@nestjs/common';
import { ChatClient } from '../models/chat-client.model';
import { ChatMessage } from '../models/chat-message.model';
import { IChatService } from '../primary-ports/chat.service.interface';

@Injectable()
export class ChatService implements IChatService {
  allMessages: ChatMessage[] = [];
  clients: ChatClient[] = [];

  addMessage(message: string, clientId: string): ChatMessage {
    const client = this.clients.find((c) => c.id === clientId);
    const chatMessage: ChatMessage = { message: message, sender: client };
    this.allMessages.push(chatMessage);
    return chatMessage;
  }

  addClient(id: string, nickname: string): ChatClient {
    let chatClient = this.clients.find(
      (c) => c.id === id && c.nickname === nickname,
    );
    if (chatClient) {
      return chatClient;
    }
    if (this.clients.find((c) => c.nickname === nickname)) {
      throw new Error('Nickname already in use');
    }
    chatClient = { id: id, nickname: nickname };
    this.clients.push(chatClient);
    return chatClient;
  }

  getClients(): ChatClient[] {
    return this.clients;
  }

  getMessages(): ChatMessage[] {
    return this.allMessages;
  }

  deleteClient(id: string): void {
    this.clients = this.clients.filter((c) => c.id !== id);
  }

  updateTyping(typing: boolean, id: string): ChatClient {
    const chatClient = this.clients.find((c) => c.id == id);
    // not sure I understand line 50... --------------------------------------------------------------------------!!
    if (chatClient && chatClient.typing !== typing) {
      chatClient.typing = typing;
      return chatClient;
    }
  }
}
