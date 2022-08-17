import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AlbumsSchema {
  @ApiProperty()
  @IsUUID()
  id: string; // uuid v4

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
