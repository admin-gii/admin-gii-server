import { ApiProperty } from "@nestjs/swagger"
import { IsInt, IsNotEmpty, IsString } from "class-validator"


export class UpdateMeDto {
  @ApiProperty({ type: String })
  @IsString()
  first_name: string;

  @ApiProperty({ type: String })
  @IsString()
  last_name: string

  @ApiProperty({ type: String })
  @IsString()
  email: string

  @ApiProperty({ type: String })
  @IsString()
  password: string;

  @ApiProperty({ type: Number })
  @IsInt()
  phone: number;
}

