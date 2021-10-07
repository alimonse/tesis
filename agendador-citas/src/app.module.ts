import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule} from "@nestjs/config";
import config from "./environment/config";
import {DatabaseModule} from "./database/database.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
      DatabaseModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
