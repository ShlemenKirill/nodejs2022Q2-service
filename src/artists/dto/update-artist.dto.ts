import { IsBoolean, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateArtistDto {
  @ApiProperty({ example: 'Updated artist' })
  @IsString()
  name: string;
  @ApiProperty({ example: true })
  @IsBoolean()
  grammy: boolean;
}
