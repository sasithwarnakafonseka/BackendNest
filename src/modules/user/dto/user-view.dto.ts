import { User } from 'src/entities/user.entity';
import { IUser } from '../interface/user.interface';

export class ViewUserDto extends User {
  formatDataSet(data: IUser) {
    return {
      id: data.id,
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      mobile_phone: data.mobile_phone,
      work_phone: data.work_phone,
      fax: data.fax,
    };
  }
}
