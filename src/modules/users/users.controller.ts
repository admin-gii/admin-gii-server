import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ChangeUserDto, CreateUserDto } from './dto';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOkResponse({ description: 'ok' })
  async getUsers(): Promise<any> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'ok' })
  async getUserById(@Param('id', ParseIntPipe) userId: number): Promise<any> {
    return await this.usersService.getUserById(userId);
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
