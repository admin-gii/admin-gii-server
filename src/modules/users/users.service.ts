import { generateHashPassword } from '@/helpers/generate.hash.password';
import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';
import { NotFoundException } from '@nestjs/common';
import { checkPhone } from '@/helpers/checkPhone.regex';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  constructor(@InjectConnection() private readonly knex: Knex) {}

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
    return await this.knex
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
      )
      .from('users as u')
      .join('roles as r', 'u.role_id', '=', 'r.id')
      .where('u.status', true);
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
        .where({
          'u.id': userId,
          'u.status': true,
        })
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
      const checkPhoneWithRegex = checkPhone(user.phone);
      if (!checkPhoneWithRegex && !!user.phone)
        throw new BadRequestException('Phone invalid!');

      const oldUser = await this.knex('users')
        .select()
        .where({ email: user.email, status: true });

      if (oldUser.length) throw new ConflictException('Email already exists!');

      user.hash = await generateHashPassword(user.hash);

      const newUser = await this.knex('users').insert(user).returning('id');

      return newUser[0];
    } catch (err) {
      throw err;
    }
  }

  async updateUser(userId: number, user: User): Promise<any> {
    try {
      const checkPhoneWithRegex = checkPhone(user.phone);
      if (!checkPhoneWithRegex && !!user.phone)
        throw new BadRequestException('Phone invalid!');

      const oldUser = await this.getUserById(userId);

      const findEmail = await this.knex('users')
        .where({ email: user.email, status: true })
        .andWhereNot({ email: oldUser.email })
        .first();

      if (findEmail) {
        throw new ConflictException('This email already exists');
      }

      if (user.hash) {
        user.hash = await generateHashPassword(user.hash);
      }

      const updatedUser = await this.knex('users')
        .update(user)
        .where('id', userId)
        .returning('id');
      if (!updatedUser.length) throw new NotFoundException('userId invalid!');
      return updatedUser[0];
    } catch (err) {
      throw err;
    }
  }

  async deleteUser(userId: number): Promise<any> {
    try {
      const deletedUser = await this.knex('users')
        .where('id', userId)
        .update({ status: false })
        .returning('id');
      if (!deletedUser.length) throw new NotFoundException('userId invalid!');
      return deletedUser[0];
    } catch (err) {
      throw err;
    }
  }
}
