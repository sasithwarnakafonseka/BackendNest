import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ITokenUser } from '../interfaces';
import { Request } from 'express';
import configuration from 'src/core/config/configuration';
import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh-token') {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.Refresh;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configuration().app.jwtRefreshSecret,
      //  passReqToCallback: true,
    });
  }

  async validate(payload: ITokenUser) {
    const user = await this.authService.getUserByRefreshToken(payload.sub);
    if (user) {
      return user;
    }

    return false;
  }

  extractHeaderToken(request: Request) {
    const auth_scheme = 'bearer';
    let token = null;
    if (request.headers['authorization'] && typeof request.headers['authorization'] === 'string') {
      const hdr = request.headers['authorization'];
      const matches = hdr.match(/(\S+)\s+(\S+)/);
      if (matches && auth_scheme === matches[1].toLowerCase()) {
        token = matches[2];
      }
    }
    return token;
  }
}
