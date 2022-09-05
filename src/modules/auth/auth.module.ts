import { PasswordResetRepository } from './repositories/passwordReset.repository';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { RedisCacheModule } from '../cache/redisCache.module';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { JwtStrategy, LocalStrategy } from './strategies';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordResetToken } from 'src/entities';

@Module({
  controllers: [AuthController],
  imports: [
    JwtModule.register({}),
    PassportModule,
    RedisCacheModule,
    UserModule,
    TypeOrmModule.forFeature([PasswordResetToken]),
  ],
  providers: [PasswordResetRepository, AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
