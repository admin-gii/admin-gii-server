import { Test, TestingModule } from '@nestjs/testing';
import { FormTypesController } from './form-types.controller';

describe('FormTypesController', () => {
  let controller: FormTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormTypesController],
    }).compile();

    controller = module.get<FormTypesController>(FormTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
