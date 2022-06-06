import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { cfg } from 'config';
import { AuthGuard } from './guard/auth.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('login')
  @HttpCode(200)
  @ApiOkResponse({ description: 'ok' })
  async login(@Body() body: AuthDto): Promise<any> {
    const user = await this.authService.validateUser(body.email, body.password);
    if (user) {
      const token = this.jwtService.sign(
        { id: user.id, email: user.email },
        {
          privateKey: cfg.jwt_secret,
        },
      );
      return { token };
    }
    throw new UnauthorizedException('Unable to login');
  }

  @Get('me')
  @HttpCode(200)
  @ApiOkResponse({ description: 'ok' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async getUserWithToken(@Req() req) {
    return req.user;
  }
}
