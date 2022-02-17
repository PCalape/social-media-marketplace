import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { GqlAuth } from '../auth/guards/auth-gql.guard';
import { CommentOutput } from './dto/comment.output';
import { CommentService } from './comment.service';
import { GetUser } from 'src/common/get-user.decorator';
import { UserOutput } from '../user/dto/user.output';
import { CommentInput } from './dto/comment.input';
import { UUIDInput } from 'src/common/uuid.input';
import { CommentUpdate } from './dto/comment.update';
import { StringOutput } from 'src/common/string.output';
import { PaginationParams } from 'src/common/pagination.input';
import { CommentPaginationOutput } from './dto/comment.pagination.output';

@Resolver(() => CommentOutput)
export class CommentResolver {
  constructor(
    private readonly commentService: CommentService,
  ) {}

  @UseGuards(GqlAuth)
  @Mutation(() => CommentOutput)
  createComment(@GetUser() user: UserOutput, @Args('input') input: CommentInput) {
    return this.commentService.createComment(user, input);
  }

  @UseGuards(GqlAuth)
  @Query(() => CommentPaginationOutput)
  getCommentsInNft(@Args('pagination', { nullable: true }) pagination: PaginationParams,
                    @Args('input') nftId: UUIDInput) {
    return this.commentService.findComments(pagination, nftId.uuid);
  }

  @UseGuards(GqlAuth)
  @Mutation(() => CommentOutput)
  updateComment(@GetUser() user: UserOutput, @Args('input') input: CommentUpdate) {
    return this.commentService.updateComment(user, input);
  }

  @UseGuards(GqlAuth)
  @Mutation(() => StringOutput)
  deleteComment(@GetUser() user: UserOutput, @Args('input') commentId: UUIDInput) {
    return this.commentService.deleteComment(user, commentId.uuid);
  }
}
