import { IsBoolean, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateArtistDto {
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsBoolean()
  grammy: boolean;
}
