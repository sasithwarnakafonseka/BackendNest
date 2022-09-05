import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import configuration from 'src/core/config/configuration';
import { User } from 'src/entities';
import { RedisCacheService } from 'src/modules/cache/redis-cache.service';
import { UsersRepository } from 'src/modules/user/repositories';
import { AuthMessages } from '../auth.messages';
import { ForgotPasswordDto } from '../dto';
import { ITokenResponse, ITokenUser } from '../interfaces';
import { PasswordResetRepository } from './../repositories/passwordReset.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepo: UsersRepository,
    private readonly cacheService: RedisCacheService,
    private readonly passwordResetTokenRepo: PasswordResetRepository,
  ) {}
  /**
   * Verify password
   * @param plainPassword
   * @param hashPassword
   */
  private async verifyPassword(plainPassword: string, hashPassword: string) {
    return await compare(plainPassword, hashPassword);
  } //verifyPassword
  /**
   * Get authenticated user
   * @param email
   * @param password
   * @returns
   */
  public async getAuthenticatedUser(email: string, password: string): Promise<User> {
    try {
      const user = await this.userRepo.getByEmail(email);
      if (!user) {
        throw new ForbiddenException(AuthMessages.InvalidCred);
      }
      if (user.status === 0) {
        throw new ForbiddenException(AuthMessages.Blocked);
      }
      const isMatch = await this.verifyPassword(password, user.password);
      if (!isMatch) {
        let message = '';
        const updateAttempt = {
          failed_login_attempt: user.failed_login_attempt + 1,
        };
        message = `${AuthMessages.InvalidCred} You have only ${5 - updateAttempt.failed_login_attempt} attempts`;
        if (updateAttempt.failed_login_attempt === 5) {
          updateAttempt['status'] = 0;
          message = `${AuthMessages.LoginAttemptExceeded}`;
        }
        await this.userRepo.update(user.id, updateAttempt);
        throw new BadRequestException(message);
      }
      if (user.failed_login_attempt > 0) {
        await this.userRepo.update(user.id, { failed_login_attempt: 0 });
      }
      return user;
    } catch (error) {
      throw error;
    }
  } // getAuthenticatedUser

  /**
   * Get access token
   */
  public async getGeneratedAccessToken(user: User, _isTwoFactor = false): Promise<ITokenResponse> {
    const payload: ITokenUser = {
      sub: user.id,
      email: user.email,
    };
    const token = this.jwtService.sign(payload, {
      secret: configuration().app.jwtSecret,
      expiresIn: `${configuration().app.jwtSecretExp}s`,
    });
    return {
      access_token: token,
      expires_in: `${configuration().app.jwtSecretExp}s`,
    } as ITokenResponse;
  } // getGeneratedAccessToken

  public async getTokenUser(id: number, _payload?: ITokenUser): Promise<ITokenUser> {
    try {
      // get user from the cache
      let user = await this.cacheService.getUser(id);
      if (!user) {
        // if cache not exist then call database
        user = await this.userRepo.tokenUserGetById(id);
        await this.cacheService.setUser(user);
      }
      const tokenUser: ITokenUser = {
        sub: user.id,
        email: user.email,
        role: user.role,
      };
      return tokenUser;
    } catch (error) {
      console.log(error);
      throw error;
    }
  } // getTokenUser

  async getUserByRefreshToken(userId: number) {
    return await this.cacheService.getUser(userId);
  } // getUserByRefreshToken

  /**
   * Forgot password token generation
   * @param email email
   */
  async forgotPasswordGetToken(email: string): Promise<boolean> {
    const user = await this.userRepo.getOne({ email }, ['id', 'email', 'first_name']);
    if (!user) {
      throw new NotFoundException('Invalid email');
    }
    const code = await this.passwordResetTokenRepo.getOne({ email });

    let token = null;
    if (code) {
      code.generateActivationCode();
      code.setExpireDate();
      const newToken = await this.passwordResetTokenRepo
        .update(code.id, code)
        .then(async () => await this.passwordResetTokenRepo.getOne({ id: code.id }));
      token = newToken.token;
    } else {
      const newCode = this.passwordResetTokenRepo.create({ email });
      console.log('newCode', newCode);
      const newToken = await this.passwordResetTokenRepo.save(newCode);
      token = newToken.token;
    }

    if (token) {
      //TODO Send Gend Mail
      // const linkGen = this.createForgotPasswordLink(token, email);
      //TODO send mail
    }
    return false;
  } // forgotPasswordGetToken

  /**
   * Reset password using reset code
   * @param data email, password, reset code
   */
  async resetPassword(data: ForgotPasswordDto): Promise<boolean> {
    // get reset code from db
    const code = await this.passwordResetTokenRepo.getOne({
      token: data.code,
      email: data.email,
    });
    if (!code) {
      throw new BadRequestException('Invalid reset link or link already used');
    }

    // validate expire date
    const date = new Date();
    if (code.expiration.getTime() < date.getTime()) {
      throw new BadRequestException('Link has expired. Please try again.');
    }

    const user = await this.userRepo.getOne({ email: data.email });
    if (!user) {
      throw new NotFoundException('Invalid email');
    }
    user.password = await hash(data.newPassword, 10);

    return await this.userRepo
      .update(user.id, user)
      .then(async () => {
        this.passwordResetTokenRepo.remove(code.id);
        return true;
      })
      .catch((e) => {
        throw new InternalServerErrorException(e);
      });
  } // resetPassword

  createForgotPasswordLink(code, email) {
    const frontRedirectUrl = configuration().app.webPortalUrl;
    const forgotPwdLink = `${frontRedirectUrl}/password-reset?code=${code}&email=${email}`;
    return forgotPwdLink;
  } // createForgotPasswordLink
}
