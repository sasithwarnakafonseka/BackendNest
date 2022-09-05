import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/core/repository';
import { PasswordResetToken } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class PasswordResetRepository extends BaseRepository<PasswordResetToken> {
  constructor(
    @InjectRepository(PasswordResetToken)
    private passwordResetRepo: Repository<PasswordResetToken>,
  ) {
    super(passwordResetRepo);
  }
}
