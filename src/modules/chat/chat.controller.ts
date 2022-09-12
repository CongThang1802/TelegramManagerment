import { Controller, Get, HttpException, HttpStatus, Param } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get(":id")
  async findAll(@Param("id") id: string) {
    try {
      return await this.chatService.fetchChat(id);
    } catch (error) {
      throw new HttpException(error.message,HttpStatus.BAD_REQUEST)
    }
  }
}
