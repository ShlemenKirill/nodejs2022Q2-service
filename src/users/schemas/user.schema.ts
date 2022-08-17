import { IsNumber, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class UserSchema {
  @ApiProperty()
  @IsUUID()
  id: string; // uuid v4
  @ApiProperty()
  @IsString()
  login: string;

  @ApiProperty()
  @IsString()
  @Exclude()
  password: string;
  @ApiProperty()
  @IsNumber()
  version: number; // integer number, increments on update
  @ApiProperty()
  @IsNumber()
  createdAt: number; // timestamp of creation
  @ApiProperty()
  @IsNumber()
  updatedAt: number; // timestamp of last update

  constructor(partial: Partial<UserSchema>) {
    Object.assign(this, partial);
  }
}
