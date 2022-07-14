import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class AlbumsSchema {
  @IsUUID()
  id: string; // uuid v4

  @IsString()
  name: string;

  @IsNumber()
  year: number;

  @IsString()
  @IsOptional()
  artistId: string | null; // refers to Artist
}
