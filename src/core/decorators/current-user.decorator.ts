import { ITokenUser } from './../interface/token.interface';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator((data: unknown, ctx: ExecutionContext): ITokenUser => {
  const request = ctx.switchToHttp().getRequest();

  if (!request.user) {
    return null;
  }

  const currentUser: ITokenUser = {
    id: request.user.sub,
  };
  return currentUser;
});
