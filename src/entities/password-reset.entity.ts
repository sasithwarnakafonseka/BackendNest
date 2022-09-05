import { randomBytes } from 'crypto';
import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PasswordResetToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  token: string;

  @Column()
  expiration: Date;

  @CreateDateColumn()
  created_at: Date;

  // Set expire date
  @BeforeInsert()
  async generateActivationCode() {
    const token = randomBytes(6).toString('base64');
    const replaced = token.replace(/[^\w\s]/gi, '');
    this.token = replaced;
  }

  @BeforeInsert()
  async setExpireDate() {
    const expireDate = new Date();
    expireDate.setHours(expireDate.getHours() + 1);
    this.expiration = expireDate;
  }
}
