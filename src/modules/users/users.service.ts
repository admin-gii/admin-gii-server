import { generateHashPassword } from '@/helpers/generate.hash.password';
import { ConflictException, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';
import { UpdateMeDto } from './dto/update-me.dto';

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
        'u.hash',
      )
      .where({ email, status: true })
      .join('roles as r', 'r.id', 'u.role_id')
      .first();
  }

  async findAll(): Promise<User[]> {
    return await this.knex('users').select();
  }

  async updateCurrentUser(
    userId: number,
    dto: UpdateMeDto,
  ): Promise<{ id: number } | undefined> {
    const user = await  this.knex('users').where({id: userId}).first()
    const findEmail = await this.knex('users').where({email:dto.email}).andWhereNot({email:user.email });
    if(findEmail.length){
      throw new ConflictException('This email already exists')
    }
    const updateMe = await this.knex('users')
    .where({ id:userId })
    .update({
      first_name: dto.first_name,
      last_name: dto.last_name,
      email: dto.email,
      hash: await generateHashPassword(dto.password),
      phone: dto.phone,
      updated_at:new Date()
    })
    .returning('id');

    return {id:updateMe[0].id}
  }
}
