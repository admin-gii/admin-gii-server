import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { Knex } from "knex";
import { InjectConnection } from "nest-knexjs";
import { ChangeRoleDto, CreateRoleDto } from "./dto/role.dto";

export type Role = any;

@Injectable()
export class RoleService {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  async findOne(id: number): Promise<Role> {
    const findRole = await this.knex('roles').where({ id })
    if (!findRole.length) throw new NotFoundException("roleId invalid")
    return findRole[0]
  } 

  findAll(): Promise<Role[]> {
    return this.knex('roles').select().orderBy('created_at', 'desc')
  }

  async createRole(createRoleDto: CreateRoleDto): Promise<{id: number} | undefined> {
    try {
      const newRole = await this.knex('roles').insert({name: createRoleDto.name, slug: createRoleDto.slug}).returning("*")
      return newRole.length ? { id: newRole[0].id }: undefined
    } catch(error) {
      throw new ConflictException("Duplicate key value violates unique constraint")
    }
  }

  async changeRole(id: number, changeRoleDto: ChangeRoleDto): Promise<{id: number} | undefined> {
    const findRole = await this.knex('roles')
      .where({ id })
      .update({
        name: changeRoleDto.name,
        slug: changeRoleDto.slug,
        updated_at: new Date()
      })
      .returning('id');

    if (!findRole.length) throw new NotFoundException("roleId invalid!")
    
    return { id: findRole[0].id }
  }

  async deleteRole(id: number): Promise<{id: number} | undefined> {
    const findRole = await this.knex('roles')
      .where({ id })
      .del()
      .returning('id');
    
    if (!findRole.length) throw new NotFoundException("roleId invalid!")

    return { id: findRole[0].id }
  }
}