import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Pepito' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'pepito@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Pepito123' })
  @MinLength(6)
  password: string;
}
