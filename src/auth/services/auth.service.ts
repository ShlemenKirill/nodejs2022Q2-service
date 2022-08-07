import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserSchema } from '../../users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<UserSchema> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return new UserSchema({
        ...user,
      });
    }
    return null;
  }

  async login(user: UserSchema) {
    const payload = { username: user.login, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
