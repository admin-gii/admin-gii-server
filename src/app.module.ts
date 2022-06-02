import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { KnexModule } from 'nest-knexjs';
import { cfg } from '../config/index';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    KnexModule.forRoot(cfg.knex),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
