import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthService } from "../auth/auth.service";
import { UsersService } from "../users/users.service";
import { RoleController } from "./role.controller";
import { RoleService } from "./role.service";

@Module({
  controllers: [RoleController],
  providers: [RoleService, AuthService, UsersService, JwtService]
})
export class RoleModule {}