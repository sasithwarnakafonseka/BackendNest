import { IPagination } from '../pagination';

export interface PaginatedResponse<T> {
  data: T[];
  pageInfo: IPagination;
}
