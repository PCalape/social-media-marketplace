import { NftEntity } from './entity/nft.entity';
import { EntityRepository, Repository, Not } from 'typeorm';

@EntityRepository(NftEntity)
export class NftRepository extends Repository<NftEntity> {
  async findNfts(nftId: string) {
    return await super.find({ id: Not(nftId) });
  }
}
