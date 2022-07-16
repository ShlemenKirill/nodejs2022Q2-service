import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAlbumDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  year: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  artistId: string | null; // refers to Artist
}
