import { CommentEntity } from './entity/comment.entity';
import { EntityRepository, Repository, Not, Equal } from 'typeorm';

@EntityRepository(CommentEntity)
export class CommentRepository extends Repository<CommentEntity> {
  async findComments(userId: string) {
    return await super.find({ id: Not(userId) });
  }
}