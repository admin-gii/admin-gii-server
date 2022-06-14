import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { ChangeRoleDto, CreateRoleDto } from "./dto/role.dto";
import { RoleService } from "./role.service";
import { JwtAuthGuard } from "../auth/guard/jwt-auth.guard";

@Controller('roles')
@ApiTags('roles')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get(':id')
  @ApiOkResponse({ description: 'ok' })
  getRole(@Param('id', ParseIntPipe) id: number) {
    return this.roleService.findOne(id)
  }

  @Get('/slug/:slug')
  @ApiOkResponse({ description: 'ok' })
  getByRole(@Param('slug') slug: string) {
    return this.roleService.getBySlug(slug)
  }

  @Get()
  @ApiOkResponse({ description: 'ok' })
  getRoles() {
    return this.roleService.findAll()
  }

  @Post()
  @ApiOkResponse({ description: 'ok' })
  createRole(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.createRole(createRoleDto)
  }

  @Put(':id')
  @ApiOkResponse({ description: 'ok' })
  changeRole(@Param('id', ParseIntPipe) id: number, @Body() changeRoleDto: ChangeRoleDto) {
    return this.roleService.changeRole(id, changeRoleDto)
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'ok' })
  deleteRole(@Param('id', ParseIntPipe) id: number) {
    return this.roleService.deleteRole(id)
  }
}