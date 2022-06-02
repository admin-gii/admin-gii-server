import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email, pass);

    if (user && user.hash === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}