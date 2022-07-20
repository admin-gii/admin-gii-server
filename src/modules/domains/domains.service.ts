import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';

export type Domain = any;
// Hello world !
@Injectable()
export class DomainsService {
  constructor(@InjectConnection() private readonly knex: Knex) { }

  async getAllDomain(): Promise<Domain> {
    return await this.knex('domains');
  };

  async getDomainByID(id: number): Promise<Domain> {
    return await this.knex('domains').where('id', id);
  };

  async getDomainBySlug(slug: string): Promise<Domain> {
    return await this.knex('domains').where('slug', slug);
  }

  async newDomain(name: string, slug: string): Promise<Domain> {
    return await this.knex('domains').insert({name, slug}, '*');
  }

  async updateDomain(id: number, name: string, slug: string): Promise<Domain> {
    return await this.knex('domains').update({name, slug},'*').where('id', id);
  }

  async deletedomain(id: number): Promise<Domain> {
    return await this.knex("domains").where({id}).del();
  }
}
