import { DomainsValuesModule } from './modules/domainValues/domainsValues.module';
import { DomainsValuesController } from './modules/domainValues/domainsValues.controller';
import { DomainsValuesService } from './modules/domainValues/domainsValues.service';
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
import { FormTypesModule } from './modules/form-types/form-types.module';
import { DomainsModule } from './modules/domains/domains.module';

@Module({
  imports: [
    DomainsValuesModule,
    ConfigModule.forRoot({ envFilePath: '.env' }),
    KnexModule.forRoot(cfg.knex),
    AuthModule,
    UsersModule,
    JwtModule,
    RoleModule,
    FormTypesModule,
    DomainsModule
  ],
  controllers: [
    DomainsValuesController, AppController, AuthController, RoleController],
  providers: [
    DomainsValuesService, AppService],
})
export class AppModule { }
