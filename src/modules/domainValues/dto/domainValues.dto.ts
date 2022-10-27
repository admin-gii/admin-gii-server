import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDomainValuesDto {
  @ApiProperty({ type: String, example: 'title', description: 'domain value' })
  @IsNotEmpty()
  @IsString()
  value: string;

  @ApiProperty({ type: Number, example: 1, description: 'domain field id' })
  @IsNotEmpty()
  @IsNumber()
  domain_field_id: number;

  @ApiProperty({ type: Number, example: 1, description: 'domain id' })
  @IsNotEmpty()
  @IsNumber()
  domain_id: number;
}
