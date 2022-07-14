import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class TrackSchema {
  @IsUUID()
  id: string; // uuid v4
  @IsString()
  name: string;
  @IsString()
  @IsOptional()
  artistId: string | null; // refers to Artist
  @IsString()
  @IsOptional()
  albumId: string | null; // refers to Album
  @IsNumber()
  duration: number; // integer number
}
