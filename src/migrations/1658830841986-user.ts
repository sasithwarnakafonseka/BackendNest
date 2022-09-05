import { hash } from 'bcrypt';
import { User } from 'src/entities';
import { UserRole } from 'src/modules/user/enum';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class user1658830841986 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const password = await hash('admin@123', 10);
    const user = {
      first_name: 'Super',
      last_name: 'Admin',
      email: 'super@yopmail.com',
      password,
      role: UserRole.SuperAdmin,
    };

    await queryRunner.manager.save(User, user);
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    // remove super admin
    const userRepo = queryRunner.connection.getRepository(User);
    await userRepo.delete({
      email: 'super@yopmail.com',
    });
  }
}
