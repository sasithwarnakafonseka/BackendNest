import { IsNotEmpty, IsNumber } from 'class-validator';

export class PaginatedDataDTO {
  @IsNotEmpty()
  list: object[];

  @IsNotEmpty()
  @IsNumber()
  rowCount: number;
}
