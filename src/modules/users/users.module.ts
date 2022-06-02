import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthController } from '../auth/auth.controller';
import { AuthService } from '../auth/auth.service';

@Module({
  providers: [UsersService, AuthService],
  exports: [UsersService, AuthService],
  controllers: [UsersController, AuthController],
})
export class UsersModule {}
