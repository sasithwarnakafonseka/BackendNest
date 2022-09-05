import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumberString, IsOptional } from 'class-validator';
import { SortOrder } from '../enums/sort-order.enum';

export class PageRequest {
  @ApiPropertyOptional()
  @IsNumberString()
  @IsOptional()
  page?: number;

  @ApiPropertyOptional()
  @IsNumberString()
  @IsOptional()
  limit?: number;

  @ApiPropertyOptional()
  @IsNumberString()
  @IsOptional()
  skip?: number;

  @ApiPropertyOptional()
  @ApiProperty()
  sort?: string;

  @ApiPropertyOptional()
  @ApiProperty()
  sortOrder?: SortOrder;
}
