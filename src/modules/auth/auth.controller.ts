import { Body, Controller, Get, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import configuration from 'src/core/config/configuration';
import { RedisCacheService } from '../cache/redis-cache.service';
import { AuthUser } from './decorators';
import { ForgotPasswordDto, LoginDto } from './dto';
import { JwtAuthGuard, LocalAuthGuard } from './guards';
import { IRequestWithUser, ITokenUser } from './interfaces';
import { AuthService } from './services/auth.service';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly cacheService: RedisCacheService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Body() login: LoginDto, @Req() req: IRequestWithUser, @Res() response: Response) {
    const { user } = req;
    const token = await this.authService.getGeneratedAccessToken(user);
    delete user.password;
    await this.cacheService.setUser(user);
    await this.cacheService.setLoggedTokens(user, token.access_token);

    token.user = user; // instanceToPlain(user, { groups: ['token-response'] }) as User;

    // delete token.user.role;

    response.cookie('Authentication', token.access_token, {
      maxAge: Number(configuration().app.jwtSecretExp) * 1000,
      httpOnly: true,
      sameSite: 'strict',
    });

    return response.send(token);
  }

  @Post('logout')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async logout(@Req() req: any, @Res() response: Response, @AuthUser() user: ITokenUser) {
    response.cookie('Authentication', '', {
      maxAge: 0,
      httpOnly: true,
      sameSite: 'strict',
      // secure: configuration().app.isProd,
    });
    await this.cacheService.clearLoggedTokens(user.sub);
    return response.send({ status: 200, message: 'Logged Out' });
  } // logout

  @Get('forgot-password/:email')
  async forgotPasswordGetToken(@Param('email') email: string) {
    return await this.authService.forgotPasswordGetToken(email);
  } // forgotPassword

  @Post('forgot-password')
  async resetPassword(@Body() data: ForgotPasswordDto) {
    const reset = await this.authService.resetPassword(data);
    return reset;
  } // resetPassword
}
