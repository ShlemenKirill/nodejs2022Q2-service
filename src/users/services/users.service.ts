import {
  ClassSerializerInterceptor,
  Injectable,
  UseInterceptors,
} from '@nestjs/common';
import { UserSchemaResponse } from '../schemas/user.schema';
import { localStorage } from '../../LocalStorage';
import { CreateUserDto } from '../dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { isUUID } from '@nestjs/common/utils/is-uuid';
import { ErrorsMessages } from '../../_core/constants';

@Injectable()
export class UsersService {
  @UseInterceptors(ClassSerializerInterceptor)
  getAll(): UserSchemaResponse[] {
    return localStorage.users;
  }
  getById(id): UserSchemaResponse {
    if (!isUUID(id)) {
      throw new Error(ErrorsMessages.notValidUuid);
    }
    const user = localStorage.users.find((el) => el.id === id);
    if (!user) {
      throw new Error(ErrorsMessages.userNotExist);
    }
    return user;
  }
  createUser(createUserDto: CreateUserDto): UserSchemaResponse {
    const { login, password } = createUserDto;
    const user = {
      id: uuidv4(),
      login,
      password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    localStorage.users.push(user);
    return {
      id: user.id,
      login: user.login,
      version: user.version,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
  updateUser(id: string, updateUserDto: UpdatePasswordDto): UserSchemaResponse {
    if (!isUUID(id)) {
      throw new Error(ErrorsMessages.notValidUuid);
    }
    const { oldPassword, newPassword } = updateUserDto;
    const userToUpdate = localStorage.users.find((el) => el.id === id);
    if (!userToUpdate) {
      throw new Error(ErrorsMessages.userNotExist);
    }
    const { id: userId, login, password, version, createdAt } = userToUpdate;
    if (password !== oldPassword) {
      throw new Error(ErrorsMessages.notCorrectPassword);
    }
    const indexOfUserToUpdate = localStorage.users.findIndex(
      (el) => el.id === id,
    );
    const resultUser = {
      id: userId,
      login,
      password: newPassword,
      version: version + 1,
      createdAt,
      updatedAt: Date.now(),
    };
    localStorage.users.splice(indexOfUserToUpdate, 1, resultUser);
    return {
      id: resultUser.id,
      login: resultUser.login,
      version: resultUser.version,
      createdAt: resultUser.createdAt,
      updatedAt: resultUser.updatedAt,
    };
  }

  deleteUser(id: string): UserSchemaResponse {
    if (!isUUID(id)) {
      throw new Error(ErrorsMessages.notValidUuid);
    }
    const userToDelete = localStorage.users.find((el) => el.id === id);
    if (!userToDelete) {
      throw new Error(ErrorsMessages.userNotExist);
    }
    const indexOfUserToDelete = localStorage.users.findIndex(
      (el) => el.id === id,
    );
    localStorage.users.splice(indexOfUserToDelete, 1);
    return userToDelete;
  }
}
