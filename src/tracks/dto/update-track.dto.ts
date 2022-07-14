import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateTrackDto {
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
