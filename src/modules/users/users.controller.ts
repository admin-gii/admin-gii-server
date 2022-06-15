import {
  Body,
  Controller,
  Get,
  Put,
  Req,
  UseGuards,
  Delete,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { UpdateMeDto } from './dto/update-me.dto';

import { ChangeUserDto, CreateUserDto } from './dto';
import { UsersService } from './users.service';
import { formatObject } from '@/helpers/format.object';

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
  @Put('me')
  async updateMe(@Req() req, @Body() body: UpdateMeDto): Promise<any> {
    return await this.usersService.updateCurrentUser(req.user.userId, body);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'ok' })
  async getUserById(@Param('id', ParseIntPipe) userId: number): Promise<any> {
    let user = await this.usersService.getUserById(userId);
    user = formatObject(user);
    return user;
  }

  @Post()
  @ApiCreatedResponse({ description: 'created' })
  async createUser(@Body() userDto: CreateUserDto): Promise<any> {
    return await this.usersService.createUser(userDto);
  }

  @Put(':id')
  @ApiOkResponse({ description: 'ok' })
  async updateUser(
    @Param('id', ParseIntPipe) userId: number,
    @Body() userDto: ChangeUserDto,
  ): Promise<any> {
    return await this.usersService.updateUser(userId, userDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'ok' })
  async deletedUser(@Param('id', ParseIntPipe) userId: number): Promise<any> {
    return await this.usersService.deleteUser(userId);
  }
}
