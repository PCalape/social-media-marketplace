import { NftEntity } from './entity/nft.entity';
import { EntityRepository, Repository, Not } from 'typeorm';

@EntityRepository(NftEntity)
export class NftRepository extends Repository<NftEntity> {
  async findOneNft(nftId: string) {
    return await super.findOne({ relations: ['comments'], where: { id: nftId } });
  }
}
