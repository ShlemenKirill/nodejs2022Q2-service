import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'Test user',
  })
  @IsString()
  login: string;
  @ApiProperty({
    example: 'qwerty',
  })
  @IsString()
  password: string;
}
