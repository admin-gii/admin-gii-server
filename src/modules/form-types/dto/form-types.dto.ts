import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateFormTypesDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  slug: string;

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  @IsInt()
  domain_id: number;

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  @IsInt()
  domain_label_field_id: number;

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  @IsInt()
  domain_value_field_id: number;
}

export class UpdateFormTypesDto {
  @IsOptional()
  @ApiProperty({ type: String })
  @IsString()
  name: string;

  @IsOptional()
  @ApiProperty({ type: String })
  @IsString()
  slug: string;

  @IsOptional()
  @ApiProperty({ type: Number })
  @IsInt()
  domain_id: number;

  @IsOptional()
  @ApiProperty({ type: Number })
  @IsInt()
  domain_label_field_id: number;

  @IsOptional()
  @ApiProperty({ type: Number })
  @IsInt()
  domain_value_field_id: number;
}
