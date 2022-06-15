import { generateHashPassword } from '@/helpers/generate.hash.password';
import { ConflictException, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';
import { UpdateMeDto } from './dto/update-me.dto';
import { BadRequestException } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { RoleService } from '../roles/role.service';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  constructor(
    @InjectConnection() private readonly knex: Knex,
    private roleService: RoleService,
  ) {}

  async findOne(email: string): Promise<User | undefined> {
    return await this.knex('users as u')
      .select(
        'u.id',
        'u.phone',
        'u.email',
        'u.first_name',
        'u.last_name',
        'u.status',
        'r.name as role__name',
        'u.role_id as role__id',
        'r.slug as role__slug',
        'u.created_at',
        'r.created_at as role__created_at',
        'r.updated_at as role__updated_at',
        'u.updated_at',
        'u.hash',
      )
      .where({ email, status: true })
      .join('roles as r', 'u.role_id', '=', 'r.id')
      .first();
  }

  async findAll(): Promise<User[]> {
    return await this.knex('users').select();
  }

  async updateCurrentUser(
    userId: number,
    dto: UpdateMeDto,
  ): Promise<{ id: number } | undefined> {
    const user = await this.knex('users').where({ id: userId }).first();
    const findEmail = await this.knex('users')
      .where({ email: dto.email })
      .andWhereNot({ email: user.email });
    if (findEmail.length) {
      throw new ConflictException('This email already exists');
    }
    const updateMe = await this.knex('users')
      .where({ id: userId })
      .update({
        first_name: dto.first_name,
        last_name: dto.last_name,
        email: dto.email,
        hash: await generateHashPassword(dto.password),
        phone: dto.phone,
        updated_at: new Date(),
      })
      .returning('id');

    return { id: updateMe[0].id };
  }

  async getUserById(userId: number): Promise<User> {
    try {
      const user = await this.knex
        .select(
          'u.id',
          'u.phone',
          'u.email',
          'u.first_name',
          'u.last_name',
          'u.status',
          'r.name as role__name',
          'r.id as role__id',
          'r.slug as role__slug',
          'u.created_at',
          'r.created_at as role__created_at',
          'r.updated_at as role__updated_at',
          'u.updated_at',
          'u.hash',
        )
        .from('users as u')
        .join('roles as r', 'u.role_id', '=', 'r.id')
        .where('u.id', userId)
        .first();

      if (!user) throw new NotFoundException('userId invalid!');
      delete user.hash;
      return user;
    } catch (err) {
      throw err;
    }
  }

  async createUser(user: User): Promise<User> {
    try {
      const oldUser = await this.knex('users')
        .select()
        .where({ email: user.email });
      if (oldUser.length) throw new ConflictException('Email already exists!');
      await this.validatePhoneAndRoleId(user?.role_id, user?.phone);
      user.hash = await generateHashPassword(user.hash);
      const newUser = await this.knex('users').insert(user).returning('*');
      return {
        message: 'User successfully created!',
        user: newUser[0],
      };
    } catch (err) {
      throw err;
    }
  }

  async updateUser(userId: number, user: User): Promise<any> {
    try {
      if (user.hash) {
        user.hash = await generateHashPassword(user.hash);
      }
      await this.validatePhoneAndRoleId(user?.role_id, user?.phone);
      const updatedUser = await this.knex('users')
        .update(user)
        .where('id', userId)
        .returning('*');
      if (!updatedUser.length) throw new NotFoundException('userId invalid!');
      return {
        message: 'User updated',
        user: updatedUser[0],
      };
    } catch (err) {
      throw err;
    }
  }

  async deleteUser(userId: number): Promise<any> {
    try {
      const deletedUser = await this.knex('users')
        .where('id', userId)
        .del()
        .returning('*');
      if (!deletedUser.length) throw new NotFoundException('userId invalid!');
      return {
        message: 'User deleted',
        user: deletedUser[0],
      };
    } catch (err) {
      throw err;
    }
  }

  async validatePhoneAndRoleId(role_id: number, phone: BigInt) {
    await this.roleService.findOne(role_id);
    if (phone !== undefined) {
      const phoneRegex = /^9989[012345789][0-9]{7}$/;
      if (!phoneRegex.test(phone.toString())) {
        throw new BadRequestException('Invalid phone number');
      }
    }
  }
}
