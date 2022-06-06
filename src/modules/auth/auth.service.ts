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

  async verifyToken(request): Promise<any> {
    try {
      if (typeof request.headers.authorization === 'undefined') {
        throw new UnauthorizedException();
      }
      const bearerToken = request.headers.authorization;
      const token = bearerToken.substring(7, bearerToken.length);
      const { email } = this.jwtService.verify(token, {
        secret: cfg.jwt_secret,
      });
      const user = await this.usersService.findOne(email);
      if (!user) {
        throw new UnauthorizedException();
      }
      delete user.hash;
      request.user = user;
      return true;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
