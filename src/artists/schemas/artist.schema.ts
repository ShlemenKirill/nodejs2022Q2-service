import { IsBoolean, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ArtistSchema {
  @ApiProperty({
    description: 'uuid v4',
  })
  @IsUUID()
  id: string;
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsBoolean()
  grammy: boolean;
}
