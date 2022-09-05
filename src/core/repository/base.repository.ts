import { DeepPartial, FindConditions, FindManyOptions, FindOneOptions, Repository, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { IPagination } from '../pagination';
import { IBaseRepository } from './interface/base-repository.interface';

export abstract class BaseRepository<T> implements IBaseRepository<T> {
  private entity: Repository<T>;
  protected constructor(entity: Repository<T>) {
    this.entity = entity;
  }

  /**
   * Get all data with count
   * @param where
   * @param select
   * @param relations
   * @param sort
   * @param page
   * @returns
   */
  async getAll(
    where?: FindManyOptions['where'],
    select?: FindManyOptions['select'],
    relations?: FindManyOptions['relations'],
    sort?: FindManyOptions['order'],
    page?: IPagination,
  ): Promise<[T[], number]> {
    const options: Record<string, unknown> = {};
    if (select) {
      options['select'] = select;
    }
    if (where) {
      options['where'] = where;
    }
    if (relations) {
      options['relations'] = relations;
    }
    if (sort) {
      options['order'] = sort;
    }
    if (page) {
      options['skip'] = page.skip;
      options['take'] = page.limit;
    }

    return await this.entity.findAndCount(options);
  } // getAll

  /**
   * Get count with filter
   * @param filter
   * @returns
   */
  async count(filter?: Record<string, unknown>): Promise<number> {
    return await this.entity.count(filter);
  } // count

  /**
   * Get entity by id with relations
   * @param id
   * @param select
   * @param relations
   * @returns
   */
  async getOneById(
    id: number,
    select?: FindManyOptions['select'],
    relations?: FindManyOptions['relations'],
  ): Promise<T> {
    const options: Record<string, unknown> = {};
    options['where'] = { id };
    if (select) {
      options['select'] = select;
    }
    if (relations) {
      options['relations'] = relations;
    }
    return await this.entity.findOne(options);
  } // getOneByIds

  /**
   * Get entity
   * @param where
   * @param select
   * @param relations
   * @returns
   */
  async getOne(
    where: FindOneOptions['where'],
    select?: FindOneOptions['select'],
    relations?: FindManyOptions['relations'],
  ): Promise<T> {
    const options: Record<string, unknown> = { where };
    if (select) {
      options['select'] = select;
    }
    if (relations) {
      options['relations'] = relations;
    }
    return await this.entity.findOne(options);
  } // getOne

  /**
   * Create entity
   * @param data
   * @returns
   */
  create(data: DeepPartial<T>): T {
    return this.entity.create(data);
  } // create

  /**
   * Create entity
   * @param data
   * @returns
   */
  async createMany(data: DeepPartial<T>[]): Promise<T[]> {
    return this.entity.save(data);
  } // create many

  /**
   * Save entity
   * @param data
   * @returns
   */
  async save(data: DeepPartial<T>): Promise<T> {
    return this.entity.save(data);
  } // save

  /**
   * Create and return created entity
   * @param data
   * @returns
   */
  async createAndGetEntity(data: DeepPartial<T>): Promise<T> {
    return this.entity.save(data).then(async (entity) => await this.getOneById((entity as any).id));
  } // createAndGetEntity

  async update(id: number, data: QueryDeepPartialEntity<T>): Promise<UpdateResult> {
    return this.entity.update(id, data);
  } // update

  /**
   * Update and return updated entity
   * @param id
   * @param data
   * @returns
   */
  async updateAndGetEntity(id: number, data: QueryDeepPartialEntity<T>): Promise<T> {
    return this.entity.update(id, data).then(async () => await this.getOneById(id));
  } // updateAndGetEntity

  async updateAll(criteria: number | number[] | FindConditions<T>, partialEntity: QueryDeepPartialEntity<T>) {
    return await this.entity.update(criteria, partialEntity);
  } // updateAll

  /**
   * Delete entity
   * @param id
   * @returns
   */
  async remove(id: number) {
    return await this.entity.delete(id);
  } // remove

  /**
   * Update with criteria and return updated entity
   * @param where
   * @returns
   */
  async removeWithCriteria(where: FindManyOptions['where']) {
    return await this.entity.delete(where);
  } // removeWithCriteria

  /**
   * Soft delete
   * @param id
   * @returns
   */
  async softDelete(id: number) {
    return await this.entity.softDelete(id);
  } // softDelete

  /**
   * Soft delete with criteria
   * @param where
   * @returns
   */
  async softDeleteWithCriteria(where: FindManyOptions['where']) {
    return await this.entity.softDelete(where);
  }
}
