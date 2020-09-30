import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './client/client.module';
import { ClientService } from './client/client.service';

@Module({
  imports: [
    ClientModule,
  ],
  controllers: [AppController],
  providers: [AppService, ClientService],
})
export class AppModule { }
