// noinspection JSIgnoredPromiseFromCall

import { UnauthorizedException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { AppModule } from './app.module';
import configuration from './core/config/configuration';
import { customExceptionFactory, ValidationFilter } from './core/validation';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
  });
  // Set global api end point
  app.setGlobalPrefix(`${configuration().app.version}`);
  // security
  app.use(helmet());
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
      },
    }),
  );
  app.use(
    helmet.permittedCrossDomainPolicies({
      permittedPolicies: 'none',
    }),
  );

  app.use(
    rateLimit({
      windowMs: 2 * 60 * 1000, // 2 minutes
      max: 500, // limit each IP to 500 requests per windowMs
    }),
  );

  // Global Filters
  const whitelist = configuration().app.corsWhiteList.split(', ');
  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new UnauthorizedException('Blocked by CORS policy'));
      }
    },
    credentials: true,
  });
  // app.enableCors();
  app.use(cookieParser());

  app.useGlobalFilters(new ValidationFilter());
  app.useGlobalPipes(new ValidationPipe({ exceptionFactory: customExceptionFactory }));

  // Swagger documentation config
  const options = new DocumentBuilder()
    .setTitle('Helm Closing API')
    .setDescription('API Documentation')
    .setVersion('1.0.0')
    .addCookieAuth('Authentication')
    .build();
  const doc = SwaggerModule.createDocument(app, options);

  // Swagger API Documentation
  SwaggerModule.setup(`${configuration().app.version}/docs`, app, doc, {
    explorer: true,
    swaggerOptions: {
      docExpansion: 'none',
      filter: true,
      showRequestDuration: true,
    },
  });

  await app.listen(configuration().app.port);
}
bootstrap();
