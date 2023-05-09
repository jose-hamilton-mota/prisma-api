import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
  @ApiProperty({description:'email do usuario'})
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({description:'Nome completo do usuario'})
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({description:'se é admin ou não'})
  @IsBoolean()
  admin: boolean;
}
