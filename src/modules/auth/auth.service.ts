import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { cfg } from 'config';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);

    if (user) {
      const isMatch = await bcrypt.compare(pass, user.hash);
      if (isMatch) {
        const { password, ...result } = user;

        return result;
      }
      return null;
    }
    return null;
  }

  async getUser(email: string): Promise<any> {
    return await this.usersService.findOne(email);
  }
}
