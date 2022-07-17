import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordDto {
  @ApiProperty({
    description: 'Previous password',
    example: 'qwerty',
  })
  @IsString()
  oldPassword: string;
  @ApiProperty({
    description: 'New password',
    example: '12345',
  })
  @IsString()
  newPassword: string;
}
