import { TransactionEntity } from './entity/transaction.entity';
import { EntityRepository, Repository, Not, Equal } from 'typeorm';

@EntityRepository(TransactionEntity)
export class TransactionRepository extends Repository<TransactionEntity> {
  async findTransactions(userId: string) {
    return await super.find({ id: Not(userId) });
  }

  async viewProfile(userId: string) {
    return await super.find({ id: Equal(userId) });
  }
}
