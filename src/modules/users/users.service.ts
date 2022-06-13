import { generateHashPassword } from '@/helpers/generate.hash.password';
import { BadRequestException, ConflictException } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';
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
        'u.id as user_id',
        'u.phone as user_phone',
        'u.email as user_email',
        'u.first_name as user_firstname',
        'u.last_name as user_last_name',
        'u.status as user_status',
        'r.name as role_name',
        'u.role_id',
        'r.slug as role_slug',
        'u.created_at as user_created_at',
        'r.created_at as role_created_at',
        'r.updated_at as role_updated_at',
        'u.updated_at as user_updated_at',
        'u.hash',
      )
      .where({ email, status: true })
      .join('roles as r', 'r.id', 'u.role_id')
      .first();
  }

  async findAll(): Promise<User[]> {
    return await this.knex('users').select();
  }

  async getUserById(userId: number): Promise<User> {
    try {
      const user = await this.knex('users').select().where('id', userId);
      if (!user.length) throw new NotFoundException('userId invalid!');
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
