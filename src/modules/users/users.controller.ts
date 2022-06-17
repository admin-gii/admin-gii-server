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
import { formatArrayObject, formatObject } from '@/helpers/format.object';
import { CreateResponse } from '@/helpers/create.response';

@Controller('users')
@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOkResponse({ description: 'ok' })
  async getUsers(): Promise<any> {
    let users = await this.usersService.findAll();
    users = formatArrayObject(users);

    return CreateResponse(users, 'Get users success');
  }

  @ApiOkResponse({ description: 'ok' })
  @Put('me')
  async updateMe(@Req() req, @Body() body: UpdateMeDto): Promise<any> {
    const user = await this.usersService.updateUser(req.user.id, body);
    return CreateResponse(user, 'Update user success');
  }

  @Get(':id')
  @ApiOkResponse({ description: 'ok' })
  async getUserById(@Param('id', ParseIntPipe) userId: number): Promise<any> {
    let user = await this.usersService.getUserById(userId);
    user = formatObject(user);
    return CreateResponse(user, 'Get user by id success');
  }

  @Post()
  @ApiCreatedResponse({ description: 'created' })
  async createUser(@Body() userDto: CreateUserDto): Promise<any> {
    const user = await this.usersService.createUser(userDto);
    return CreateResponse(user, 'Create user success');
  }

  @Put(':id')
  @ApiOkResponse({ description: 'ok' })
  async updateUser(
    @Param('id', ParseIntPipe) userId: number,
    @Body() userDto: ChangeUserDto,
  ): Promise<any> {
    const user = await this.usersService.updateUser(userId, userDto);
    return CreateResponse(user, 'Update user success');
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'ok' })
  async deletedUser(@Param('id', ParseIntPipe) userId: number): Promise<any> {
    const user = await this.usersService.deleteUser(userId);
    return CreateResponse(user, 'Delete user success');
  }
}
