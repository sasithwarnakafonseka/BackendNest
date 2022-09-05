import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class FilterUserDto {
  @ApiPropertyOptional()
  @ApiProperty()
  readonly company?: number;

  @ApiPropertyOptional()
  @ApiProperty()
  readonly comapnyLocationInfo?: number;

  @ApiPropertyOptional()
  @ApiProperty()
  readonly status?: number;
}
