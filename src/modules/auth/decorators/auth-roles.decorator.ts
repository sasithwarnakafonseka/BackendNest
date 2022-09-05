import { SetMetadata } from '@nestjs/common';

export const AuthRoles = (...args: string[]) => SetMetadata('roles', args);
