import { Injectable } from '@nestjs/common';
import { UserSchema } from '../schemas/user.schema';
import { CreateUserDto } from '../dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { isUUID } from '@nestjs/common/utils/is-uuid';
import { ErrorsMessages } from '../../_core/constants';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async getAll(): Promise<UserSchema[]> {
    return await this.prisma.user.findMany();
  }
  async getById(id) {
    if (!isUUID(id)) {
      throw new Error(ErrorsMessages.notValidUuid);
    }
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new Error(ErrorsMessages.userNotExist);
    }
    return user;
  }
  async createUser(createUserDto: CreateUserDto) {
    const { login, password } = createUserDto;
    const user = {
      id: uuidv4(),
      login,
      password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    return await this.prisma.user.create({
      data: user,
    });
  }
  async updateUser(id: string, updateUserDto: UpdatePasswordDto) {
    if (!isUUID(id)) {
      throw new Error(ErrorsMessages.notValidUuid);
    }
    const { oldPassword, newPassword } = updateUserDto;
    const userToUpdate = await this.prisma.user.findUnique({ where: { id } });
    if (!userToUpdate) {
      throw new Error(ErrorsMessages.userNotExist);
    }
    const { id: userId, login, password, version, createdAt } = userToUpdate;
    if (password !== oldPassword) {
      throw new Error(ErrorsMessages.notCorrectPassword);
    }
    const resultUser: Prisma.UserUpdateInput = {
      id: userId,
      login,
      password: newPassword,
      version: version + 1,
      createdAt: createdAt,
      updatedAt: Date.now(),
    };
    return await this.prisma.user.update({
      where: { id },
      data: resultUser,
    });
  }

  async deleteUser(id: string) {
    if (!isUUID(id)) {
      throw new Error(ErrorsMessages.notValidUuid);
    }
    const userToDelete = await this.prisma.user.findUnique({ where: { id } });
    if (!userToDelete) {
      throw new Error(ErrorsMessages.userNotExist);
    }
    return await this.prisma.user.delete({
      where: { id },
    });
  }

  async findOne(login: string) {
    return this.prisma.user.findFirst({
      where: { login: login },
    });
  }
}
