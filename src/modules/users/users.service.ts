import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  constructor(@InjectConnection() private readonly knex: Knex) {}

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
      )
      .where({ email, status: true })
      .join('roles as r', 'r.id', 'u.role_id')
      .first();
  }

  async findAll(): Promise<User[]> {
    return await this.knex('users').select();
  }
}
