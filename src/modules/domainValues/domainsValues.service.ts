/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, NotFoundException } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';
import { CreateDomainValuesDto } from './dto/domainValues.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class DomainsValuesService {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  async getDomainValues() {
    const domain_values = await this.knex('domain_values as dv')
      .select(
        this.knex.raw(
          `dv.id , dv.value , json_build_object('id',d.id ,'name',d.slug ,'slug',d.slug) as domain, json_build_object('name',df.name ,'slug',df.slug , 'domain' , (select json_build_object('id',d2.id ,'name',d2.slug ,'slug',d2.slug) from domains d2 where d2.id = df.domain_id)) as domainField`,
        ),
      )
      .innerJoin('domains as d', 'd.id', 'dv.domain_id')
      .innerJoin('domain_fields as df', 'df.id', 'dv.domain_field_id');
    return domain_values;
  }

  async getDomainValuesById(id: number) {
    const domain_values = await this.knex('domain_values as dv')
      .select(
        this.knex.raw(
          `dv.id , dv.value , json_build_object('id',d.id ,'name',d.slug ,'slug',d.slug) as domain, json_build_object('name',df.name ,'slug',df.slug , 'domain' , (select json_build_object('id',d2.id ,'name',d2.slug ,'slug',d2.slug) from domains d2 where d2.id = df.domain_id)) as domainField`,
        ),
      )
      .innerJoin('domains as d', 'd.id', 'dv.domain_id')
      .innerJoin('domain_fields as df', 'df.id', 'dv.domain_field_id')
      .where({ 'dv.id': id })
      .first();
    if (!domain_values) {
      throw new NotFoundException('domain-values invalid!');
    }
    return domain_values;
  }

  async postDomainValues(dto: CreateDomainValuesDto) {
    await this.validateDomainValues(dto);
    const domain_values = await this.knex('domain_values')
      .insert({ ...dto, group_id: uuidv4() })
      .returning('id');
    return domain_values[0];
  }

  async putDomainValues(dto: CreateDomainValuesDto, domainValuesId: number) {
    await this.validateDomainValues(dto);
    const domain_values = await this.knex('domain_values')
      .update(dto)
      .where({ id: domainValuesId })
      .returning('id');
    if (!domain_values.length) {
      throw new NotFoundException('domain-values invalid!');
    }
    return domain_values[0];
  }

  async deleteDomainValues(domainValuesId: number) {
    const domain_values = await this.knex('domain_values')
      .where({ id: domainValuesId })
      .del()
      .returning('id');
    if (!domain_values.length) {
      throw new NotFoundException('domain-values invalid!');
    }
    return domain_values[0];
  }

  private async validateDomainValues(dto: CreateDomainValuesDto) {
    const { domain_field_id, domain_id } = dto;
    const domain_fields = await this.knex('domain_fields')
      .where({ id: domain_field_id })
      .first();
    const domains = await this.knex('domains').where({ id: domain_id }).first();
    if (!domains || !domain_fields) {
      throw new NotFoundException('Domain or Domain field invalid');
    }
    return true;
  }
}
