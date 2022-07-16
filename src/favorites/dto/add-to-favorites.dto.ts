import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddToFavoritesDto {
  @ApiProperty()
  @IsString()
  id: string;
}
