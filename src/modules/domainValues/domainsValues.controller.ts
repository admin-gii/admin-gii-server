import { CreateResponse } from '@/helpers/create.response';
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
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { DomainsValuesService } from './domainsValues.service';
import { CreateDomainValuesDto } from './dto/domainValues.dto';

@ApiTags('Domain-values')
@Controller()
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class DomainsValuesController {
  constructor(private readonly domainsValuesService: DomainsValuesService) {}

  @Get('domain-values')
  @HttpCode(200)
  @ApiOkResponse({ description: 'ok' })
  async getDomainValues(): Promise<any> {
    const domainValues = await this.domainsValuesService.getDomainValues();
    return CreateResponse(domainValues, 'Get domain-values success');
  }

  @Get('domain-values/:id')
  @HttpCode(200)
  @ApiOkResponse({ description: 'ok' })
  async getDomainValuesById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<any> {
    const domainValues = await this.domainsValuesService.getDomainValuesById(
      id,
    );
    return CreateResponse(domainValues, 'Get domain-values by id success');
  }

  @Post('domain-values')
  @HttpCode(200)
  @ApiOkResponse({ description: 'ok' })
  async postDomainValues(@Body() dto: CreateDomainValuesDto): Promise<any> {
    const domainValues = await this.domainsValuesService.postDomainValues(dto);
    return CreateResponse(domainValues, 'Create domain-values success');
  }

  @Put('domain-values/:id')
  @HttpCode(200)
  @ApiOkResponse({ description: 'ok' })
  async putDomainValues(
    @Param('id', ParseIntPipe) domainValuesId: number,
    @Body() dto: CreateDomainValuesDto,
  ): Promise<any> {
    const domainValues = await this.domainsValuesService.putDomainValues(
      dto,
      domainValuesId,
    );
    return CreateResponse(domainValues, 'Update domain-values success');
  }

  @Delete('domain-values/:id')
  @HttpCode(200)
  @ApiOkResponse({ description: 'ok' })
  async deleteDomainValues(@Param('id', ParseIntPipe) domainValuesId: number) {
    const domainValues = await this.domainsValuesService.deleteDomainValues(
      domainValuesId,
    );
    return CreateResponse(domainValues, 'Delete domain-values success');
  }
}
