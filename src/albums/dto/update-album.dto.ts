import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAlbumDto {
  @ApiProperty({
    example: 'Changed Album',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 1990,
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
