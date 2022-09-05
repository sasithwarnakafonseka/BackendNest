import { IsNotEmpty } from 'class-validator';

export class MessageResponseDTO {
  @IsNotEmpty()
  message: string;
}
