import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ type: String })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @ApiProperty({ type: String })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ type: Number })
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  phone: BigInt;

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  @IsNumber()
  role_id: number;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  hash: string;

  @ApiProperty({ type: Boolean })
  @IsOptional()
  @IsBoolean()
  status: boolean;
}

export class ChangeUserDto {
  @IsOptional()
  @ApiProperty({ type: String })
  @IsString()
  first_name: string;

  @IsOptional()
  @ApiProperty({ type: String })
  @IsString()
  last_name: string;

  @IsOptional()
  @ApiProperty({ type: String })
  @IsString()
  @IsEmail()
  email: string;

  @IsOptional()
  @ApiProperty({ type: Number })
  @IsNumber()
  phone: BigInt;

  @IsOptional()
  @ApiProperty({ type: Number })
  @IsNumber()
  role_id: number;

  @IsOptional()
  @ApiProperty({ type: String })
  @IsString()
  hash: string;

  @IsOptional()
  @ApiProperty({ type: Boolean })
  @IsBoolean()
  status: boolean;
}
