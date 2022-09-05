import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class UserDto {
  //user details
  @IsNotEmpty()
  @ApiProperty()
  first_name: string;

  @IsNotEmpty()
  @ApiProperty()
  last_name: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @ApiPropertyOptional()
  mobile_phone?: number;

  @ApiPropertyOptional()
  work_phone?: number;

  @ApiProperty()
  role?: string;

  // @IsNotEmpty()
  @MinLength(8)
  @ApiPropertyOptional()
  password: string;

  // @IsNotEmpty()
  @MinLength(8)
  @ApiPropertyOptional()
  r_password: string;

  // location details

  @ApiPropertyOptional()
  is_primary?: boolean;

  @ApiPropertyOptional()
  address?: string;

  @ApiPropertyOptional()
  city?: string;

  @ApiPropertyOptional()
  state?: string;

  @ApiPropertyOptional()
  country?: string;

  @ApiPropertyOptional()
  postal_code?: string;

  //company info
  @ApiPropertyOptional()
  company_name?: string;

  @ApiPropertyOptional()
  company_website?: string;

  //pricing details
  @ApiPropertyOptional()
  package_id?: number;

  @ApiPropertyOptional()
  stripe_token?: string;
}

export class userLocationDto {
  @IsNotEmpty()
  @ApiProperty()
  first_name: string;

  @IsNotEmpty()
  @ApiProperty()
  last_name: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @ApiPropertyOptional()
  mobile_phone?: number;

  @ApiPropertyOptional()
  work_phone?: string;

  @ApiPropertyOptional()
  location?: string;
}
