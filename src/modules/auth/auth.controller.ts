import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOkResponse({ description: 'ok' })
  async login(@Body() body: AuthDto): Promise<any> {
    const user = await this.authService.validateUser(body.email, body.password);
    if (user) {
      return user;
    }
    return new UnauthorizedException('Unable to login');
  }
}
