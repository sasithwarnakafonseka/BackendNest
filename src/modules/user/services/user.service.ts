import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { IPagination } from 'src/core/pagination';
import { FilterUserDto } from '../dto/user-filter.dto';
import { UpdateUserPasswordDto } from '../dto/user-update.dto';
import { UserDto, userLocationDto } from '../dto/user.dto';
import { UserRole } from '../enum';
import { IUser } from '../interface/user.interface';
import { UsersRepository } from './../repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UsersRepository) {}

  async create(user: UserDto) {
    const userExist = await this.userRepo.getByEmail(user.email);
    if (userExist) {
      throw new BadRequestException(`User already exists with ${user.email}`);
    }

    let newUser: IUser = {};

    const passwordHash = await hash(user.r_password, 10);

    newUser = {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      password: passwordHash,
      status: 1,
      role: UserRole.Anonymous,
      failed_login_attempt: 0,
    };

    return this.userRepo.save(newUser).then((res) => {
      // Send Mail to User
      return res;
    });
  }

  async setStatus(id: number, status: number): Promise<IUser> {
    const statusSet = await this.userRepo.updateAndGetEntity(id, { status: status });
    return statusSet;
  }

  async findOne(id: number): Promise<IUser> {
    const user = await this.userRepo.getOneById(id, null, ['broker_details', 'broker_details.associations', 'company']);
    return user;
  }

  async findAll(filter: FilterUserDto, _page: IPagination) {
    return await this.userRepo.getAll(filter, null, ['broker_details', 'company']);
  }

  /**
   * Change user password
   * @param id
   * @param changePasswordDto
   * @returns
   */
  async changePassword(id: string, changePasswordDto: UpdateUserPasswordDto) {
    const uid = parseInt(id);
    const user = await this.userRepo.getOneById(uid);
    if (!user) {
      throw new ForbiddenException(`Invalid User`);
    }
    const isPasswordCorrect = await compare(changePasswordDto.current_password, user.password);
    if (!isPasswordCorrect) {
      throw new BadRequestException(`Invalid current password`);
    }
    const newPassword = await hash(changePasswordDto.new_password, 10);
    return await this.userRepo.updatePassword(uid, newPassword).then(async (res) => {
      if (res) {
        return true;
      } else {
        throw new ForbiddenException(`Password not updated`);
      }
    });
  }

  async createLocationUser(id: number, user: userLocationDto) {
    // const currentUser = await this.userRepo.getOneById(id);
    const userExist = await this.userRepo.getByEmail(user.email);
    if (userExist) {
      throw new BadRequestException(`User already exists with ${user.email}`);
    }

    let newUser: IUser = {};
    const generatedPassword = Math.random().toString(36).slice(2);
    const passwordHash = await hash(generatedPassword, 10);
    newUser = {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      password: passwordHash,
      status: 1,
      failed_login_attempt: 0,
    };

    return this.userRepo.save(newUser).then((res) => {
      // Send Mail to User

      return res;
    });
  }

  async welcomeMail(_id: number) {
    // const user = await this.userRepo.getOneById(id);
  }
}
