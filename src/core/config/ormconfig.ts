import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import appConfig from './configuration';

export const config: TypeOrmModuleOptions = {
  type: appConfig().database.type as any,
  host: appConfig().database.host,
  port: appConfig().database.port,
  username: appConfig().database.user,
  password: appConfig().database.password,
  database: appConfig().database.schema,
  charset: 'utf8mb4',
  entities: ['src/**/*.entity{.ts,.js}'],
  migrations: ['src/migrations/*{.ts,.js}'],
  //keepConnectionAlive: false,
  cli: {
    migrationsDir: 'src/migrations',
  },
  extra: {
    charset: 'utf8mb4',
  },
  synchronize: false,
  legacySpatialSupport: false,
  logging: !appConfig().app.isProd,
};
