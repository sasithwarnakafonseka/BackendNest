import { IPagination } from 'src/core/pagination';
import { DeepPartial, FindConditions, FindManyOptions, FindOneOptions, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export interface IBaseRepository<T> {
  /**
   * Create entity and return
   * @param data
   */
  create(data: DeepPartial<T>): T;

  /**
   * Get all data with count
   * @param where
   * @param select
   * @param relations
   * @param sort
   * @param page
   */
  getAll(
    where?: FindManyOptions['where'],
    select?: FindManyOptions['select'],
    relations?: FindManyOptions['relations'],
    sort?: FindManyOptions['order'],
    page?: IPagination,
  ): Promise<[T[], number]>;

  /**
   * Get count with filter
   * @param filter
   */
  count(filter?: Record<string, unknown>): Promise<number>;

  /**
   * Get entity by id with relations
   * @param id
   * @param select
   * @param relations
   */
  getOneById(id: number, select?: FindManyOptions['select'], relations?: FindManyOptions['relations']): Promise<T>;

  /**
   * Get entity
   * @param where
   * @param select
   * @param relations
   */
  getOne(
    where: FindOneOptions['where'],
    select?: FindOneOptions['select'],
    relations?: FindManyOptions['relations'],
  ): Promise<T>;

  /**
   * Save entity
   * @param data
   */
  save(data: DeepPartial<T>): Promise<T>;

  /**
   * Create and return created entity
   * @param data
   */
  createAndGetEntity(data: DeepPartial<T>): Promise<T>;

  /**
   * Update and return updated entity
   * @param id
   * @param data
   */
  update(id: number, data: QueryDeepPartialEntity<T>): Promise<UpdateResult>;

  /**
   * Update and return updated entity
   * @param id
   * @param data
   */
  updateAndGetEntity(id: number, data: QueryDeepPartialEntity<T>): Promise<T>;

  updateAll(criteria: number | number[] | FindConditions<T>, partialEntity: QueryDeepPartialEntity<T>);

  /**
   * Delete entity
   * @param id
   */
  remove(id: number);

  /**
   * Soft delete
   * @param id
   */
  softDelete(id: number);
}
