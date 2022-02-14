import { UseGuards } from '@nestjs/common';
import { Resolver, Query } from '@nestjs/graphql';
import { GqlAuth } from '../auth/guards/auth-gql.guard';
import { CommentOutput } from './dto/comment.output';
import { RoleEnum } from 'src/common/roles.enum';
import { Roles } from 'src/common/role.decorator';
import { AuthorizationGuard } from '../auth/guards/authorization-guard';
import { CommentService } from './comment.service';

@Resolver(() => CommentOutput)
export class CommentResolver {
  constructor(
    private readonly commentService: CommentService,
  ) {}

  @UseGuards(GqlAuth, AuthorizationGuard)
  @Roles(RoleEnum.ADMIN)
  @Query(() => [CommentOutput])
  getComments() {
    return this.commentService.findComments();
  }
}
