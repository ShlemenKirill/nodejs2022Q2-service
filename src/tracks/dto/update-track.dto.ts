import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTrackDto {
  @ApiProperty({
    example: 'Updated track',
  })
  @IsString()
  name: string;
  @ApiProperty({
    example: null,
    description: 'refers to Artist',
  })
  @IsString()
  @IsOptional()
  artistId: string | null;
  @ApiProperty()
  @IsString()
  @IsOptional()
  @ApiProperty({
    example: null,
    description: 'refers to Album',
  })
  albumId: string | null;
  @ApiProperty()
  @IsNumber()
  @ApiProperty({
    example: 40,
  })
  duration: number;
}
