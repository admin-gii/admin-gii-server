import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";


export class NewDomainDto {
  @ApiProperty({type: String})
  @IsNotEmpty()
  @IsString()
  readonly name: string

  @ApiProperty({type: String})
  @IsNotEmpty()
  @IsString()
  readonly slug: string
}

export class UpdateDomainDto {
  @ApiProperty({type: String})
  @IsNotEmpty()
  @IsString()
  readonly name: string

  @ApiProperty({type: String})
  @IsNotEmpty()
  @IsString()
  readonly slug: string
};