import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ITokenUser } from '../interfaces';

export const AuthUser = createParamDecorator((data: any, ctx: ExecutionContext): ITokenUser => {
  const req = ctx.switchToHttp().getRequest();
  const user: ITokenUser = req.user;
  if (user) {
    return user;
  }
  return null;
});
