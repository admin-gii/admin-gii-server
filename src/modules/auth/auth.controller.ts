import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { cfg } from 'config';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { formatObject } from '@/helpers/format.object';
import { CreateResponse } from '@/helpers/create.response';

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async login(@Req() req, @Body() _body: AuthDto): Promise<any> {
    const user = req.user;
    const payload = { userId: user.id, sub: user.email };

    const accessToken = this.jwtService.sign(payload, {
      secret: cfg.jwt.secret,
      expiresIn: cfg.jwt.expiresIn,
    });
    return CreateResponse(
      {
        token: `Bearer ${accessToken}`,
      },
      'Login Success',
    );
  }

  @Get('me')
  @HttpCode(200)
  @ApiOkResponse({ description: 'ok' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async getUserWithToken(@Req() req): Promise<any> {
    let user = await this.authService.getUser(req.user.userId);
    user = formatObject(user);
    return CreateResponse(user, 'Get Me Success');
  }
}
