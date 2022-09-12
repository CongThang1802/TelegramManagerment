import { Controller, Get, Param } from '@nestjs/common';
import { ChannelService } from './channel.service';

@Controller('channel')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}


  @Get(":accountId")
  async fetchChannel(@Param("accountId") accountId:string){
    return await this.channelService.fetchChannel(accountId);
  }
}
