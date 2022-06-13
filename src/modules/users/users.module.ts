import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthController } from '../auth/auth.controller';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { RoleService } from '../roles/role.service';

@Module({
  providers: [UsersService, AuthService, JwtService, RoleService],
  exports: [UsersService, AuthService, JwtService],
  controllers: [UsersController, AuthController],
})
export class UsersModule {}
