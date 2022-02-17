import { CommentEntity } from './entity/comment.entity';
import { EntityRepository, Repository } from 'typeorm';
import { PaginationParams } from 'src/common/pagination.input';
import { CommentPaginationOutput } from './dto/comment.pagination.output';

@EntityRepository(CommentEntity)
export class CommentRepository extends Repository<CommentEntity> {
  async findCommentsInNft(pagination: PaginationParams, nftId: string): Promise<CommentPaginationOutput> {
    const take = pagination.limit || 5;
    const page = pagination.page || 1;
    const skip= (page-1) * take ;

    const data = await super.findAndCount({ 
      where: { nft: {id: nftId}}, 
      skip: skip, 
      take: take,
      order: {updatedAt: 'DESC'} });
    return this.paginateResponse(data, page, take);
  }

  paginateResponse(data: [CommentEntity[], number], page: number, limit: number): CommentPaginationOutput {
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
