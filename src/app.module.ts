import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './core/config/configuration';
import { AuthModule } from './modules/auth/auth.module';
import { RedisCacheModule } from './modules/cache/redisCache.module';
import { UserModule } from './modules/user/user.module';
import Joi from 'joi';
import { RouteInfo } from '@nestjs/common/interfaces';
import { JsonBodyMiddleware } from './core/middleware/json-body-parser.middleware';
import { RawBodyMiddleware } from './core/middleware/row-body-parser.middleware';

const rawBodyParsingRoutes: Array<RouteInfo> = [
  {
    path: '*document/singed',
    method: RequestMethod.POST,
  },
];

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      validationSchema: Joi.object({
        STRIPE_SECRET_KEY: Joi.string(),
        STRIPE_CURRENCY: Joi.string(),
        FRONTEND_URL: Joi.string(),
      }),
    }),
    TypeOrmModule.forRoot({
      type: configuration().database.type as any,
      host: configuration().database.host,
      port: configuration().database.port,
      username: configuration().database.user,
      password: configuration().database.password,
      database: configuration().database.schema,
      charset: configuration().database.charset,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: false,
      migrations: ['./migrations/*{.ts,.js}'],
      cli: {
        migrationsDir: './migrations',
      },
      extra: {
        charset: configuration().database.charset,
      },
      logging: !configuration().app.isProd,
      legacySpatialSupport: false,
    }),
    AuthModule,
    UserModule,
    RedisCacheModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer
      .apply(RawBodyMiddleware)
      .forRoutes(...rawBodyParsingRoutes)
      .apply(JsonBodyMiddleware)
      .exclude(...rawBodyParsingRoutes)
      .forRoutes('*');
  }
}
