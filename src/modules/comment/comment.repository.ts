import { CommentEntity } from './entity/comment.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(CommentEntity)
export class CommentRepository extends Repository<CommentEntity> {
  async findCommentsInNft(offset: number, limit: number, nftId: string) {
    const [output, total] = await super.findAndCount({ where: { nft: {id: nftId}}, 
      skip: offset, 
      take: limit });
    return {output: output, total: total};
  }
}
