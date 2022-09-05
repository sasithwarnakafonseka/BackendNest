import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ITokenUser } from '../interfaces';
import { Request } from 'express';
import configuration from 'src/core/config/configuration';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.Authentication;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configuration().app.jwtSecret,
    });
  }

  async validate(payload: ITokenUser) {
    return payload;
  }
}
