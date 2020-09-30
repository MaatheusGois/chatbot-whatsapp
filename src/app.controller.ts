import { Controller, Get, Param } from '@nestjs/common';
import WAWebJS = require('whatsapp-web.js');
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('status')
  getStatus(): Promise<WAWebJS.WAState> {
    return this.appService.getStatus();
  }

  @Get('qr-code')
  async getQRCode() {
    return await this.appService.getQRCode();
  }

  @Get('send/:number/:message')
  sendMessage(@Param('number') numberParam: string, @Param('message') messageParam: string): Promise<string> {
    console.log(numberParam, messageParam)
    if (!numberParam || !messageParam) { return }
    return this.appService.sendMessage(numberParam, messageParam);
  }
}
