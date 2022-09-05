import { BaseEntity } from './../core/repository/base.entity';
import { Column, Entity } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class User extends BaseEntity {
  @Column({ nullable: true })
  first_name: string;

  @Column({ nullable: true })
  last_name: string;

  @Column({ nullable: true, unique: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ default: 1, type: 'int' })
  status: number;

  @Column({ nullable: true, type: 'int' })
  package: number;

  @Column({ nullable: false })
  role: string;

  @Column({ default: 0 })
  @Exclude()
  failed_login_attempt: number;

  @Column({ nullable: true })
  stripe_customer_id: string;

  @Column({ nullable: true })
  mobile_phone: string;

  @Column({ nullable: true })
  work_phone: string;

  @Column({ nullable: true })
  fax: string;

  @Column({ nullable: true })
  profile_picture: string;

  @Column({ nullable: true })
  about_me: string;

  @Column({ nullable: true })
  all_signing_events: boolean;

  @Column({ nullable: true })
  fully_executed_contracts: boolean;

  @Column({ nullable: true })
  insurance_quote_requests: boolean;

  @Column({ nullable: true })
  brokers_assistant: string;

  @Column({ nullable: true })
  default_currency: string;

  @Column({ nullable: true })
  vessel_measurement: boolean;

  @Column({ nullable: true })
  display_seller_ss: string;

  @Column({ nullable: true })
  display_buyer_as: string;

  @Column({ nullable: true })
  sales_id: string;

  @Column({ nullable: true })
  default_sort_order: string;
}
