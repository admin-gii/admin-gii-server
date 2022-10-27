import { CreateResponse } from '@/helpers/create.response';
import { formatArrayObject, formatObject } from '@/helpers/format.object';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateFormTypesDto, UpdateFormTypesDto } from './dto/form-types.dto';
import { FormTypesService } from './form-types.service';

@Controller('form-types')
@ApiTags('form-types')
@ApiBearerAuth()
export class FormTypesController {
  constructor(private formTypesService: FormTypesService) {}
  @Get()
  @HttpCode(200)
  @ApiOkResponse({ description: 'ok' })
  async getFormType() {
    let formTypes = await this.formTypesService.getAllFormTypes();
    formTypes = formatArrayObject(formTypes);
    return CreateResponse(formTypes, 'Get all form types success');
  }

  @Get('/slug/:slug')
  @HttpCode(200)
  @ApiOkResponse({ description: 'ok' })
  async getFormTypeBySlug(@Param('slug') slug: string) {
    let formType = await this.formTypesService.getFormTypeBySlug(slug);
    formType = formatObject(formType);
    return CreateResponse(formType, 'Get form type by slug success');
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOkResponse({ description: 'ok' })
  async getFormTypeById(@Param('id', ParseIntPipe) id: number) {
    let formType = await this.formTypesService.getFormTypeById(id);
    formType = formatObject(formType);
    return CreateResponse(formType, 'Get form type by id success');
  }

  @Post()
  @HttpCode(201)
  @ApiCreatedResponse({ description: 'created' })
  async createFormType(@Body() formTypeDto: CreateFormTypesDto) {
    let newFormType = await this.formTypesService.createFormType(formTypeDto);
    newFormType = formatObject(newFormType);
    return CreateResponse(newFormType[0], 'Successfully created!');
  }

  @Put(':id')
  @HttpCode(200)
  @ApiOkResponse({ description: 'ok' })
  async updateFormType(
    @Param('id', ParseIntPipe) id: number,
    @Body() formTypeDto: UpdateFormTypesDto,
  ) {
    const updatedId = await this.formTypesService.updateFormType(
      id,
      formTypeDto,
    );
    return CreateResponse(updatedId[0], 'Form type updated successfully!');
  }

  @Delete(':id')
  @HttpCode(200)
  @ApiOkResponse({ description: 'ok' })
  async deleteFormType(@Param('id', ParseIntPipe) id: number) {
    const deletedId = await this.formTypesService.deleteFormType(id);
    return CreateResponse(deletedId, 'Deleted successfully');
  }
}
