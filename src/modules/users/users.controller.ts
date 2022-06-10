import { Body, Controller, Get, Put, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { UpdateMeDto } from './dto/update-me.dto';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOkResponse({ description: 'ok' })
  async getUsers(): Promise<any> {
    return await this.usersService.findAll();
  }

  
  @ApiOkResponse({ description: 'ok' })
  @Put('update-me')
  async updateMe(@Req() req , @Body() body:UpdateMeDto): Promise<any> {
    return await this.usersService.updateCurrentUser( req.user.userId  , body )
  }
}
