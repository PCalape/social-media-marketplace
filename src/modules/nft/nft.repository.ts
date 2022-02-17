import { NftEntity } from './entity/nft.entity';
import { EntityRepository, Repository, Not } from 'typeorm';

@EntityRepository(NftEntity)
export class NftRepository extends Repository<NftEntity> {
  async findOneNft(nftId: string) {
    return await super.findOne({ relations: ['comments'], where: { id: nftId } });
  }

  // async findCommentsInNft(pagination: PaginationParams, nftId: string): Promise<PaginationOutput> {
  //   const take = pagination.limit || 5;
  //   const page = pagination.page || 1;
  //   const skip= (page-1) * take ;

  //   const data = await super.findAndCount({ 
  //     where: { nft: {id: nftId}}, 
  //     skip: skip, 
  //     take: take,
  //     order: {updatedAt: 'DESC'} });
  //   return this.paginateResponse(data, page, take);
  // }

  // paginateResponse(data: [CommentEntity[], number], page: number, limit: number): PaginationOutput {
  //   const [output, total] = data;
  //   const lastPage = Math.ceil(total/limit);
  //   const count = output.length;
  //   const offset = count * (page - 1);
  //   return {
  //     output: output,
  //     total: total,
  //     count: count,
  //     offset: offset,
  //     limit: limit,
  //     currentPage: page,
  //     totalPage: lastPage,
  //   }
  // }
}
