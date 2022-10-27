import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';
import { CreateFormTypesDto, UpdateFormTypesDto } from './dto/form-types.dto';

export type FormType = any;

@Injectable()
export class FormTypesService {
  constructor(@InjectConnection() private readonly knex: Knex) {}
  async validateFormTypes(
    slug: string,
    domain_id: number,
    domain_label_field_id: number,
    domain_value_field_id: number,
  ) {
    if (slug) {
      const oldSlug = await this.knex('form_types').where({ slug }).first();
      if (oldSlug) throw new ConflictException('slug already exists!');
    }
    if (domain_id !== null) {
      const domain = await this.knex('domains')
        .where({ 'domains.id': domain_id })
        .first();
      if (!domain) throw new BadRequestException('domain_id is invalid!');
    }
    if (domain_label_field_id !== null) {
      const domainLabelField = await this.knex('domain_fields')
        .where({ 'domain_fields.id': domain_label_field_id })
        .first();

      if (!domainLabelField)
        throw new BadRequestException('domain_label_field_id is invalid!');
    }
    if (domain_value_field_id !== null) {
      const domainValueField = await this.knex('domain_fields')
        .where({ 'domain_fields.id': domain_value_field_id })
        .first();
      if (!domainValueField)
        throw new BadRequestException('domain_value_field_id is invalid!');
    }
  }
  async getAllFormTypes(): Promise<FormType[]> {
    return await this.knex('form_types').select().orderBy('created_at', 'desc');
  }
  async getFormTypeById(id: number): Promise<FormType> {
    const formType = await this.knex('form_types').where({ id }).first();
    if (!formType) throw new NotFoundException('Form type id invalid');
    return formType;
  }
  async getFormTypeBySlug(slug: string): Promise<FormType> {
    const formType = await this.knex('form_types').where({ slug }).first();
    if (!formType) throw new NotFoundException('Form type slug invalid');
    return formType;
  }
  async createFormType(formTypeDto: CreateFormTypesDto) {
    const { slug, domain_id, domain_label_field_id, domain_value_field_id } =
      formTypeDto;
    await this.validateFormTypes(
      slug,
      domain_id,
      domain_label_field_id,
      domain_value_field_id,
    );
    return await this.knex('form_types').insert(formTypeDto).returning('*');
  }

  async updateFormType(id: number, formTypeDto: UpdateFormTypesDto) {
    const hasFormType = await this.knex('form_types').where({ id }).first();
    if (!hasFormType) throw new NotFoundException('Form type id is invalid');
    const {
      slug = null,
      domain_id = null,
      domain_label_field_id = null,
      domain_value_field_id = null,
    } = formTypeDto;
    await this.validateFormTypes(
      slug,
      domain_id,
      domain_label_field_id,
      domain_value_field_id,
    );
    return await this.knex('form_types')
      .update(formTypeDto)
      .where({ id })
      .returning('*');
  }
  async deleteFormType(id: number) {
    const deletedId = await this.knex('form_types')
      .where({ id })
      .del()
      .returning('id');
    if (!deletedId.length) throw new NotFoundException('Form type id invalid');
    return deletedId;
  }
}
