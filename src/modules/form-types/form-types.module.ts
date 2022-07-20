import { Module } from '@nestjs/common';
import { FormTypesController } from './form-types.controller';
import { FormTypesService } from './form-types.service';

@Module({
  controllers: [FormTypesController],
  providers: [FormTypesService],
})
export class FormTypesModule {}
