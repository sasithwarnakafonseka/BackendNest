import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/core/repository';
import { User } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class UsersRepository extends BaseRepository<User> {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {
    super(userRepo);
  }

  /**
   * Get user by email with tenant
   * @param email
   * @returns
   */
  async getByEmail(email: string) {
    return await this.getOne({ email }, null, ['broker_details', 'company']);
  } // getByEmail

  /**
   * Get user information only related to session for create tokens
   * TODO: use redis
   * @param id
   * @returns
   */
  async tokenUserGetById(id: number) {
    return await this.getOne(id);
  } // tokenUserGetById

  async updatePassword(id: number, password: string): Promise<boolean> {
    const d = await this.update(id, { password });
    return d ? true : false;
  } // updatePassword
}
