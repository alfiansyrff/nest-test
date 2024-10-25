import { IsString, IsBoolean, IsOptional, IsDate } from "@nestjs/class-validator";


export class CreateTodoDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  completed: boolean;

  @IsDate()
  deadline: Date
}
