import { DomainsModule } from './modules/domains/domains.module';
import { DomainsController } from './modules/domains/domains.controller';
import { DomainsService } from './modules/domains/domains.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { KnexModule } from 'nest-knexjs';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { AuthController } from './modules/auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { cfg } from 'config';
import { RoleModule } from './modules/roles/role.module';
import { RoleController } from './modules/roles/role.controller';

@Module({
  imports: [
    DomainsModule,
    ConfigModule.forRoot({ envFilePath: '.env' }),
    KnexModule.forRoot(cfg.knex),
    AuthModule,
    UsersModule,
    JwtModule,
    RoleModule,
  ],
  controllers: [
    DomainsController, AppController, AuthController, RoleController],
  providers: [
    DomainsService, AppService],
})
export class AppModule { }
