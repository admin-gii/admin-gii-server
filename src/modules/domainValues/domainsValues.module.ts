/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { DomainsValuesController } from './domainsValues.controller';
import { DomainsValuesService } from './domainsValues.service';

@Module({
    imports: [],
    controllers: [DomainsValuesController],
    providers: [DomainsValuesService],
})
export class DomainsValuesModule { }
