import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import configuration from 'src/core/config/configuration';
import { User } from 'src/entities';

@Injectable()
export class RedisCacheService {
  private key_user = 'user-';
  private logged = 'logged-';

  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  private async get(key: string): Promise<any> {
    return await this.cache.get(key);
  } // get

  private async set(key: string, value) {
    await this.cache.set(key, value);
  } // set

  async getUser(id): Promise<User> {
    return await this.get(this.key_user + id);
  } // getUser

  async setUser(user: User) {
    delete user.password;
    const key = this.key_user + user.id;
    await this.set(key, user);
  } // setUser

  async setLoggedTokens(user: User, token: string) {
    const key = this.logged + user.id;
    const found = await this.get(key);
    if (found) {
      found.push(token);
      await this.cache.set(key, found, Number(configuration().app.jwtSecretExp));
    } else {
      const tokens = [];
      tokens.push(token);
      await this.cache.set(key, tokens, Number(configuration().app.jwtSecretExp));
    }
  } // setLoggedTokens

  async getLoggedTokens(userId: number): Promise<string[]> {
    const key = this.logged + userId;
    return await this.get(key);
  } // getLoggedTokens

  async clearLoggedTokens(userId: number) {
    const key = this.logged + userId;
    await this.cache.del(key);
  } // clearLoggedTokens
}
