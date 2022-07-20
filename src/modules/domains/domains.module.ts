import { Module } from '@nestjs/common';
import { DomainsService } from './domains.service';
import { DomainsController } from './domains.controller';

@Module({
  providers: [DomainsService],
  controllers: [DomainsController]
})
export class DomainsModule {}
