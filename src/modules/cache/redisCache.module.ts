import { CacheModule, Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import configuration from 'src/core/config/configuration';
import { RedisCacheService } from './redis-cache.service';
@Module({
  imports: [
    CacheModule.registerAsync({
      useFactory: async () => ({
        store: redisStore,
        host: configuration().redis.host,
        port: configuration().redis.port,
        password: configuration().redis.password,
        ttl: configuration().redis.ttl,
      }),
    }),
  ],
  providers: [RedisCacheService],
  exports: [RedisCacheService],
})
export class RedisCacheModule {}
