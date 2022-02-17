import { NftEntity } from './entity/nft.entity';
import { EntityRepository, Repository, Not, Like } from 'typeorm';
import { PaginationParams } from 'src/common/pagination.input';
import { NftPaginationOutput } from './dto/nft.pagination.output';

@EntityRepository(NftEntity)
export class NftRepository extends Repository<NftEntity> {
  async findOneNft(nftId: string) {
    return await super.findOne({ relations: ['comments'], where: { id: nftId } });
  }

  async findNfts(pagination: PaginationParams): Promise<NftPaginationOutput> {
    const take = pagination.limit || 5;
    const page = pagination.page || 1;
    const skip= (page-1) * take ;
    const search = pagination.search || '';
    const sortBy = pagination.sortBy || 'createdAt';
    const direction = pagination.direction || 'DESC';

    const data = await super.findAndCount({ 
      relations: ["user", "creator"],
      where: [
        { title: Like(`%${search}%`) },
        { description: Like(`%${search}%`) },
        { category: Like(`%${search}%`) },
        { user: {username: Like(`%${search}%`)} },
        { user: {firstName: Like(`%${search}%`)} },
        { user: {lastName: Like(`%${search}%`)} },
        { creator: {username: Like(`%${search}%`)} },
        { creator: {firstName: Like(`%${search}%`)} },
        { creator: {lastName: Like(`%${search}%`)} },
      ], 
      skip: skip, 
      take: take,
      order: {[sortBy]: direction} });
    return this.paginateResponse(data, page, take);
  }

  paginateResponse(data: [NftEntity[], number], page: number, limit: number): NftPaginationOutput {
    const [output, total] = data;
    const lastPage = Math.ceil(total/limit);
    const count = output.length;
    const offset = count * (page - 1);
    return {
      output: output,
      total: total,
      count: count,
      offset: offset,
      limit: limit,
      currentPage: page,
      totalPage: lastPage,
    }
  }
}
