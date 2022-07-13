import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserSchema } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UsersService } from './services/users.service';
import { ErrorsMessages } from '../_core/constants';

@Controller('/user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  @HttpCode(200)
  async all(): Promise<UserSchema[]> {
    return this.usersService.getAll();
  }
  @Get(':id')
  @HttpCode(200)
  async getById(@Param('id') id: string): Promise<UserSchema> {
    try {
      return this.usersService.getById(id);
    } catch (error) {
      switch (error.message) {
        case ErrorsMessages.notValidUuid:
          throw new HttpException(
            ErrorsMessages.notValidUuid,
            HttpStatus.BAD_REQUEST,
          );
        case ErrorsMessages.userNotExist:
          throw new HttpException(
            ErrorsMessages.userNotExist,
            HttpStatus.NOT_FOUND,
          );
      }
    }
  }
  @Post()
  @HttpCode(201)
  async create(@Body() createUserDto: CreateUserDto): Promise<UserSchema> {
    try {
      return this.usersService.createUser(createUserDto);
    } catch (error) {
      switch (error.message) {
        case ErrorsMessages.emptyFields:
          throw new HttpException(
            ErrorsMessages.emptyFields,
            HttpStatus.BAD_REQUEST,
          );
      }
    }
  }
  @Put(':id')
  @HttpCode(200)
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdatePasswordDto,
  ): Promise<UserSchema> {
    try {
      return this.usersService.updateUser(id, updateUserDto);
    } catch (error) {
      if (error.message === ErrorsMessages.userNotExist) {
        throw new HttpException(
          ErrorsMessages.userNotExist,
          HttpStatus.NOT_FOUND,
        );
      }
      if (error.message === ErrorsMessages.notValidUuid) {
        throw new HttpException(
          ErrorsMessages.notValidUuid,
          HttpStatus.BAD_REQUEST,
        );
      }
      if (error.message === ErrorsMessages.notCorrectPassword) {
        throw new HttpException(
          ErrorsMessages.notCorrectPassword,
          HttpStatus.FORBIDDEN,
        );
      }
    }
  }
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string): Promise<UserSchema> {
    try {
      return this.usersService.deleteUser(id);
    } catch (error) {
      switch (error.message) {
        case ErrorsMessages.notValidUuid:
          throw new HttpException(
            ErrorsMessages.notValidUuid,
            HttpStatus.BAD_REQUEST,
          );
        case ErrorsMessages.userNotExist:
          throw new HttpException(
            ErrorsMessages.userNotExist,
            HttpStatus.NOT_FOUND,
          );
      }
    }
  }
}
