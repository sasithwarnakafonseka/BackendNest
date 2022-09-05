import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { User } from 'src/entities';
import { UsersRepository } from './repositories';
import { UserService } from './services';
import { UserController } from './controllers/user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersRepository, UserService],
  exports: [UsersRepository, UserService],
  controllers: [UserController],
})
export class UserModule {}
