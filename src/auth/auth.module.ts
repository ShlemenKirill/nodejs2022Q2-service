import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersService } from '../users/services/users.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
