import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTrackDto {
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsString()
  @IsOptional()
  artistId: string | null; // refers to Artist
  @ApiProperty()
  @IsString()
  @IsOptional()
  albumId: string | null; // refers to Album
  @ApiProperty()
  @IsNumber()
  duration: number; // integer number
}
