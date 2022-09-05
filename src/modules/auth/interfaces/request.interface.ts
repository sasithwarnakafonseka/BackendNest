import { User } from 'src/entities';

export interface IRequestWithUser extends Request {
  user: User;
}
