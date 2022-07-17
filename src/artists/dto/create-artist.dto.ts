import { IsBoolean, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateArtistDto {
  @ApiProperty({
    example: 'Test artist',
  })
  @IsString()
  name: string;
  @ApiProperty({
    example: false,
  })
  @IsBoolean()
  grammy: boolean;
}
