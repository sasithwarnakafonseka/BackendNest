export interface IUser {
  id?: number;
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  status?: number;
  role?: string;
  mobile_phone?: string;
  work_phone?: string;
  fax?: string;
  profile_picture?: string;
  all_signing_events?: boolean;
  fully_executed_contracts?: boolean;
  insurance_quote_requests?: boolean;
  brokers_assistant?: string;
  default_currency?: string;
  vessel_measurement?: boolean;
  display_seller_ss?: string;
  display_buyer_as?: string;
  default_sort_order?: string;
  broker_details?: any;
  company?: any;
  comapnyLocationInfo?: any;
  failed_login_attempt?: number;
}
