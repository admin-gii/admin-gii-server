import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  async findOne(email: string): Promise<User | undefined> {
    return await this.knex('users').where({ email }).first();
  }

  async findAll(): Promise<User[]> {
    return await this.knex('users').select();
  }
}
