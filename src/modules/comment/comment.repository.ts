import { CommentEntity } from './entity/comment.entity';
import { EntityRepository, Repository, Not, Equal } from 'typeorm';
import { NftEntity } from '../nft/entity/nft.entity';

@EntityRepository(CommentEntity)
export class CommentRepository extends Repository<CommentEntity> {
  async findCommentsInNft(nftId: string) {
    return await super.find({ nft: {id: nftId} });
  }
}
