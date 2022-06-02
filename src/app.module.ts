import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { KnexModule } from 'nest-knexjs';
import { cfg } from '../config/index';
import { AuthModule } from './modules/users/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    KnexModule.forRoot(cfg.knex),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
