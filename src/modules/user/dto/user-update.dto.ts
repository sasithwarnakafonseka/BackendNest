import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional()
  first_name?: string;

  @ApiPropertyOptional()
  last_name?: string;

  @ApiPropertyOptional()
  email?: string;

  @ApiPropertyOptional()
  mobile_phone?: string;

  @ApiPropertyOptional()
  work_phone?: string;

  @ApiPropertyOptional()
  fax?: string;

  @ApiPropertyOptional()
  broker_license?: string;

  @ApiPropertyOptional()
  start_year_in_brokerage?: Date;

  @ApiPropertyOptional()
  certifications?: boolean;

  @ApiPropertyOptional()
  sales_id?: string;

  @ApiPropertyOptional()
  associations?: string;

  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  profile_picture?: any;

  @ApiPropertyOptional()
  about_me?: string;

  @ApiPropertyOptional()
  all_signing_events?: boolean;

  @ApiPropertyOptional()
  fully_executed_contracts?: boolean;

  @ApiPropertyOptional()
  insurance_quote_requests?: boolean;

  @ApiPropertyOptional()
  brokers_assistant?: string;

  @ApiPropertyOptional()
  default_currency?: string;

  @ApiPropertyOptional()
  vessel_measurement?: boolean;

  @ApiPropertyOptional()
  display_seller_ss?: string;

  @ApiPropertyOptional()
  display_buyer_as?: string;

  @ApiPropertyOptional()
  default_sort_order?: string;

  @ApiPropertyOptional()
  status?: number;
}

export class UpdateUserPasswordDto {
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty()
  current_password: string;

  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty()
  new_password: string;
}
