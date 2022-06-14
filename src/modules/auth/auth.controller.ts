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
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { cfg } from 'config';
import { JwtAuthGuard } from './guard/jwt-auth.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('login')
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @ApiOkResponse({ description: 'ok' })
  async login(@Req() req, @Body() body: AuthDto): Promise<any> {
    const user = req.user;
    const payload = { userId: user.user_id, sub: user.user_email };

    const accessToken = this.jwtService.sign(payload, {
      secret: cfg.jwt.secret,
      expiresIn: cfg.jwt.expiresIn,
    });
    return {
      token: `Bearer ${accessToken}`,
    };
  }

  @Get('me')
  @HttpCode(200)
  @ApiOkResponse({ description: 'ok' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async getUserWithToken(@Req() req): Promise<any> {
    const user = await this.authService.getUser(req.user.email);
    delete user.hash;
    return user;
  }
}
