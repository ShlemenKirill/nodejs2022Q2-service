import { IsBoolean, IsString, IsUUID } from 'class-validator';

export class ArtistSchema {
  @IsUUID()
  id: string; // uuid v4
  @IsString()
  name: string;
  @IsBoolean()
  grammy: boolean;
}
