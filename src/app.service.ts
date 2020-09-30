/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common';
import WAWebJS = require('whatsapp-web.js');
import { ClientService } from './client/client.service';

@Injectable()
export class AppService {
  constructor(private readonly clientService: ClientService) { }

  initClient(): string {
    this.clientService.initClient()
    return 'initializing client...';
  }

  async getStatus(): Promise<WAWebJS.WAState> {
    return this.clientService.getStatus();
  }

  async getQRCode() {
    return this.clientService.getQRCode();
  }

  sendMessage(number: string, message: string): Promise<string> {
    return this.clientService.sendMessage(number, message)
  }
}
