import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordDto {
  @ApiProperty()
  @IsString()
  oldPassword: string; // previous password
  @ApiProperty()
  @IsString()
  newPassword: string; // new password
}
