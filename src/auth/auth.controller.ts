import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './services/auth.service';
import { UserSchema } from '../users/schemas/user.schema';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/services/users.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('Auth')
@Controller('/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('/signup')
  @HttpCode(201)
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: UserSchema,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  async signup(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.usersService.createUser(createUserDto);
      return new UserSchema({
        ...user,
      });
    } catch (error) {
      console.error(error.message);
    }
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @HttpCode(201)
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: UserSchema,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  async login(@Body() createUserDto: CreateUserDto) {
    const user = await this.authService.validateUser(
      createUserDto.login,
      createUserDto.password,
    );
    return this.authService.login(user);
  }
  @Post('/refresh')
  @HttpCode(201)
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: UserSchema,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  async refresh(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.usersService.createUser(createUserDto);
      return new UserSchema({
        ...user,
      });
    } catch (error) {
      console.error(error.message);
    }
  }
}
