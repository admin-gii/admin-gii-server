import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ChangeRoleDto, CreateRoleDto } from './dto/role.dto';
import { RoleService } from './role.service';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { formatArrayObject, formatObject } from '@/helpers/format.object';
import { CreateResponse } from '@/helpers/create.response';

@Controller('roles')
@ApiTags('roles')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get(':id')
  @ApiOkResponse({ description: 'ok' })
  async getRole(@Param('id', ParseIntPipe) id: number) {
    let role = await this.roleService.findOne(id);
    role = formatObject(role);
    return CreateResponse(role, 'Get role by id success');
  }

  @Get('/slug/:slug')
  @ApiOkResponse({ description: 'ok' })
  async getByRole(@Param('slug') slug: string) {
    let role = await this.roleService.getBySlug(slug);
    role = formatObject(role);
    return CreateResponse(role, 'Get role by slug success');
  }

  @Get()
  @ApiOkResponse({ description: 'ok' })
  async getRoles() {
    let roles = await this.roleService.findAll();
    roles = formatArrayObject(roles);
    return CreateResponse(roles, 'Get roles success');
  }

  @Post()
  @ApiOkResponse({ description: 'ok' })
  async createRole(@Body() createRoleDto: CreateRoleDto) {
    let role = await this.roleService.createRole(createRoleDto);
    role = formatObject(role);
    return CreateResponse(role, 'Create role success');
  }

  @Put(':id')
  @ApiOkResponse({ description: 'ok' })
  async changeRole(
    @Param('id', ParseIntPipe) id: number,
    @Body() changeRoleDto: ChangeRoleDto,
  ) {
    let role = await this.roleService.changeRole(id, changeRoleDto);
    role = formatObject(role);
    return CreateResponse(role, 'Change role success');
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'ok' })
  async deleteRole(@Param('id', ParseIntPipe) id: number) {
    let role = await this.roleService.deleteRole(id);
    role = formatObject(role);
    return CreateResponse(role, 'Delete role success');
  }
}
