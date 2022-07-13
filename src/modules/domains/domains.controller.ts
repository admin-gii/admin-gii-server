/*
https://docs.nestjs.com/controllers#controllers
*/

import { CreateResponse } from '@/helpers/create.response';
import { formatArrayObject , formatObject} from '@/helpers/format.object';
import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { DomainsService } from './domains.service';
import { CreateDomainValuesDto } from './dto/domainValues.dto';

@ApiTags('Domains')
@Controller()
export class DomainsController {
    constructor(private readonly domainsService: DomainsService) { }

    @Get('domain-values')
    @HttpCode(200)
    @ApiOkResponse({ description: 'ok' })
    async getDomainValues(): Promise<any> {
       let domainValues =  await this.domainsService.getDomainValues()
       return CreateResponse(domainValues , 'Get domain-values success')
    }

    @Get('domain-values/:id')
    @HttpCode(200)
    @ApiOkResponse({ description: 'ok' })
    async getDomainValuesById(@Param('id', ParseIntPipe) id: number): Promise<any> {
        let domainValues  = await this.domainsService.getDomainValuesById(id)
        return CreateResponse(domainValues , 'Get domain-values by id success')
    }

    @Post('domain-values')
    @HttpCode(200)
    @ApiOkResponse({ description: 'ok' })
    async postDomainValues(@Body() dto: CreateDomainValuesDto): Promise<any> {
        const domainValues = await this.domainsService.postDomainValues(dto)
        return CreateResponse(domainValues, 'Create domain-values success')
    }

    @Put('domain-values/:id')
    @HttpCode(200)
    @ApiOkResponse({ description: 'ok' })
    async putDomainValues(@Param('id', ParseIntPipe) domainValuesId: number ,@Body() dto: CreateDomainValuesDto): Promise<any> {
        const domainValues = await this.domainsService.putDomainValues(dto , domainValuesId)
        return CreateResponse(domainValues, 'Update domain-values success')
    }

    @Delete('domain-values/:id')
    @HttpCode(200)
    @ApiOkResponse({description:'ok'})
    async deleteDomainValues(@Param('id',ParseIntPipe) domainValuesId:number){
        const domainValues = await this.domainsService.deleteDomainValues(domainValuesId)
        return CreateResponse(domainValues, 'Delete domain-values success')
    }
}
