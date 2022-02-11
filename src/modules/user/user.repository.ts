import { UserEntity } from './entity/user.entity';
import { EntityRepository, Repository, Not, Equal } from 'typeorm';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async findUsers(userId: string) {
    return await super.find({ id: Not(userId) });
  }

  async viewProfile(userId: string) {
    return await super.find({ id: Equal(userId) });
  }
}
