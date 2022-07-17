import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { UserSchema } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UsersService } from './services/users.service';
import { ErrorsMessages } from '../_core/constants';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Users')
@Controller('/user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @HttpCode(200)
  @ApiOkResponse({
    type: UserSchema,
    description: 'Users records returns successfully',
    isArray: true,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  async all(): Promise<UserSchema[]> {
    return this.usersService.getAll();
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOkResponse({
    type: UserSchema,
    description: 'User record returns successfully',
  })
  @ApiBadRequestResponse({
    description: 'Incorrect input',
  })
  @ApiNotFoundResponse({
    description: "User don't exist",
  })
  @UseInterceptors(ClassSerializerInterceptor)
  async getById(@Param('id') id: string): Promise<UserSchema> {
    try {
      const user = this.usersService.getById(id);
      return new UserSchema({
        ...user,
      });
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
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: UserSchema,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  async create(@Body() createUserDto: CreateUserDto): Promise<UserSchema> {
    try {
      const user = this.usersService.createUser(createUserDto);
      return new UserSchema({
        ...user,
      });
    } catch (error) {
      console.error(error.message);
    }
  }
  @Put(':id')
  @HttpCode(200)
  @ApiOkResponse({
    type: UserSchema,
    description: 'User record updates successfully',
  })
  @ApiNotFoundResponse({
    description: "User don't exist",
  })
  @ApiBadRequestResponse({
    description: 'Not valid UUID',
  })
  @ApiForbiddenResponse({
    description: 'Incorrect password',
  })
  @UseInterceptors(ClassSerializerInterceptor)
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdatePasswordDto,
  ): Promise<UserSchema> {
    try {
      const user = this.usersService.updateUser(id, updateUserDto);
      return new UserSchema({
        ...user,
      });
    } catch (error) {
      switch (error.message) {
        case ErrorsMessages.userNotExist:
          throw new HttpException(
            ErrorsMessages.userNotExist,
            HttpStatus.NOT_FOUND,
          );
        case ErrorsMessages.notValidUuid:
          throw new HttpException(
            ErrorsMessages.notValidUuid,
            HttpStatus.BAD_REQUEST,
          );
        case ErrorsMessages.notCorrectPassword:
          throw new HttpException(
            ErrorsMessages.notCorrectPassword,
            HttpStatus.FORBIDDEN,
          );
      }
    }
  }
  @Delete(':id')
  @HttpCode(204)
  @ApiNotFoundResponse({
    description: 'User deletes successfully',
  })
  @ApiBadRequestResponse({
    description: 'Not valid UUID',
  })
  @ApiNotFoundResponse({
    description: "User don't exist",
  })
  @UseInterceptors(ClassSerializerInterceptor)
  async remove(@Param('id') id: string): Promise<UserSchema> {
    try {
      const user = this.usersService.deleteUser(id);
      return new UserSchema({
        ...user,
      });
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
