import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { DomainsService } from './domains.service';
import { NewDomainDto, UpdateDomainDto } from './dto/domain.dto';

@Controller('domains')
export class DomainsController {
  constructor(private readonly domainServise: DomainsService) { }

  @Get()
  async getAllDomains(): Promise<any> {
    return this.domainServise.getAllDomain();
  }

  @Get(":id")
  async getDomainByID(@Param("id", ParseIntPipe) id: number): Promise<any> {
    return this.domainServise.getDomainByID(id);
  }

  @Get('/slug/:slug')
  getDomainBySlug(@Param('slug') slug: string): Promise<any> {
    return this.domainServise.getDomainBySlug(slug);
  }

  @Post()
  async newDomain(@Body() newDomainDto: NewDomainDto): Promise<any> {
    return this.domainServise.newDomain(newDomainDto.name, newDomainDto.slug)
  }

  @Put(":id")
  async updateDomain(@Body() updateDomainDto: UpdateDomainDto, @Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.domainServise.updateDomain(id, updateDomainDto.name, updateDomainDto.slug);
  }

  @Delete(":id")
  deleteDomain(@Param('id') id:number): Promise<any> {
    return this.domainServise.deletedomain(id)
  }
}
