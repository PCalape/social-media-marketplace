import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation, ResolveField, Parent } from '@nestjs/graphql';
import { GqlAuth } from '../auth/guards/auth-gql.guard';
import { NftOutput } from './dto/nft.output';
import { GetUser } from '../../common/get-user.decorator';
import { NftService } from './nft.service';
import { UserOutput } from '../user/dto/user.output';
import { NftInput } from './dto/nft.input';
import { UUIDInput } from 'src/common/uuid.input';
import { StringOutput } from 'src/common/string.output';
import { PaginationParams } from 'src/common/pagination.input';
import { NftPaginationOutput } from './dto/nft.pagination.output';
import { CommentPaginationOutput } from '../comment/dto/comment.pagination.output';
import { NftEntity } from './entity/nft.entity';
import { CommentService } from '../comment/comment.service';
import { CommentsLoader } from '../comment/comment.loader';
import { LoaderDto } from './dto/loader.dto';

@Resolver(() => NftOutput)
export class NftResolver {
  constructor(
    private readonly nftService: NftService,
    private readonly commentService: CommentService,
    private readonly commentsLoader: CommentsLoader,
  ) {}

  @UseGuards(GqlAuth)
  @Mutation(() => NftOutput)
  createNft(@GetUser() user: UserOutput, @Args('input') input: NftInput) {
    return this.nftService.createNft(user, input);
  }

  @UseGuards(GqlAuth)
  @Mutation(() => StringOutput)
  deleteNft(@GetUser() user: UserOutput, @Args('nftId') nftId: UUIDInput) {
    return this.nftService.deleteNftById(user, nftId.uuid);
  }

  @UseGuards(GqlAuth)
  @Query(() => NftOutput)
  getNft(@Args('nftId') nftId: UUIDInput) {
    return this.nftService.findNftById(nftId.uuid);
  }

  @ResolveField('comments', returns => CommentPaginationOutput)
  async getComments(@Parent() nft: NftEntity,
                    @Args('pagination', { nullable: true }) pagination: PaginationParams) {
    const { id } = nft;
    const loader = { nftId: id, pagination: pagination} as LoaderDto;
    return this.commentsLoader.getCommentsByNftId.load(loader);
  }

  @UseGuards(GqlAuth)
  @Query(() => NftPaginationOutput)
  getNfts(@Args('pagination', { nullable: true }) pagination: PaginationParams) {
    return this.nftService.findNfts(pagination);
  }
}
