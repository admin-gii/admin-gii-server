import { Test, TestingModule } from '@nestjs/testing';
import { FormTypesService } from './form-types.service';

describe('FormTypesService', () => {
  let service: FormTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FormTypesService],
    }).compile();

    service = module.get<FormTypesService>(FormTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
