import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { DomainsService } from './domains.service';
import { NewDomainDto, UpdateDomainDto } from './dto/domain.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@ApiTags("Domains")
@Controller('domains')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class DomainsController {
  constructor(private readonly domainServise: DomainsService) { }

  @Get()
  @HttpCode(200)
  @ApiOkResponse({ description: 'ok' })
  async getAllDomains(): Promise<any> {
    return this.domainServise.getAllDomain();
  }

  @Get(":id")
  @HttpCode(200)
  @ApiOkResponse({ description: 'ok' })
  async getDomainByID(@Param("id", ParseIntPipe) id: number): Promise<any> {
    return this.domainServise.getDomainByID(id);
  }

  @Get('/slug/:slug')
  @HttpCode(200)
  @ApiOkResponse({ description: 'ok' })
  getDomainBySlug(@Param('slug') slug: string): Promise<any> {
    return this.domainServise.getDomainBySlug(slug);
  }

  @Post()
  @HttpCode(200)
  @ApiOkResponse({ description: 'ok' })
  async newDomain(@Body() newDomainDto: NewDomainDto): Promise<any> {
    return this.domainServise.newDomain(newDomainDto.name, newDomainDto.slug)
  }

  @Put(":id")  
  @HttpCode(200)
  @ApiOkResponse({ description: 'ok' })
  async updateDomain(@Body() updateDomainDto: UpdateDomainDto, @Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.domainServise.updateDomain(id, updateDomainDto.name, updateDomainDto.slug);
  }

  @Delete(":id")
  @HttpCode(200)
  @ApiOkResponse({ description: 'ok' })
  deleteDomain(@Param('id') id: number): Promise<any> {
    return this.domainServise.deletedomain(id)
  }
}
