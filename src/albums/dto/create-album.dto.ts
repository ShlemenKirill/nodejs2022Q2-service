import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAlbumDto {
  @ApiProperty({
    example: 'Test album',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 1980,
  })
  @IsNumber()
  year: number;

  @ApiProperty({
    example: null,
  })
  @IsString()
  @IsOptional()
  artistId: string | null; // refers to Artist
}
