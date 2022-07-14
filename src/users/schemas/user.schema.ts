import { IsNumber, IsString, IsUUID } from 'class-validator';

export class UserSchema {
  @IsUUID()
  id: string; // uuid v4
  @IsString()
  login: string;
  @IsString()
  password: string;
  @IsNumber()
  version: number; // integer number, increments on update
  @IsNumber()
  createdAt: number; // timestamp of creation
  @IsNumber()
  updatedAt: number; // timestamp of last update
}

export class UserSchemaResponse {
  @IsUUID()
  id: string; // uuid v4
  @IsString()
  login: string;
  @IsNumber()
  version: number; // integer number, increments on update
  @IsNumber()
  createdAt: number; // timestamp of creation
  @IsNumber()
  updatedAt: number; // timestamp of last update
}
