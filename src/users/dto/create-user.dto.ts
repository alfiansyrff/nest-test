import { IsString, IsEmail } from "@nestjs/class-validator";

export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  name: string

}
