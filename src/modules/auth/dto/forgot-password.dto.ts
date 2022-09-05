import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';
import { regExpress, ValidationErrorMessage } from 'src/core/validation';

export class ForgotPasswordDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  code: string;

  @ApiProperty()
  @IsNotEmpty()
  @Matches(regExpress.password, {
    message: ValidationErrorMessage.InvalidPassword,
  })
  @MinLength(8)
  newPassword: string;
}
