import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the user.',
    minLength: 3,
    maxLength: 30,
  })
  @IsString()
  @MinLength(3, {
    message: 'Name must be at least 3 characters long.',
  })
  @MaxLength(30, {
    message: 'Name must be at most 30 characters long.',
  })
  name: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email of the user.',
    format: 'email',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'The password of the user.',
    minLength: 8,
    maxLength: 50,
  })
  @IsString()
  @MinLength(8, {
    message: 'Password must be at least 8 characters long.',
  })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
    message:
      'Password must include at least one letter, one number, and one special character.',
  })
  @MaxLength(50, {
    message: 'Password must be at most 20 characters long.',
  })
  password: string;
}
