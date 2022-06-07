import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { KnexModule } from 'nest-knexjs';
import { cfg } from '../config/index';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { AuthController } from './modules/auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { RoleModule } from './modules/roles/role.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    KnexModule.forRoot(
      cfg.node_env === 'development' ? cfg.knex_dev : cfg.knex_prod,
    ),
    AuthModule,
    UsersModule,
    JwtModule,
    RoleModule
  ],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
