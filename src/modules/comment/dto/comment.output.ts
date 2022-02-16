import { ObjectType, ID } from '@nestjs/graphql';
import { FilterableField, IDField, PagingStrategies, QueryOptions } from '@nestjs-query/query-graphql';

@ObjectType()
// @QueryOptions({ pagingStrategy: PagingStrategies.OFFSET })
export class CommentOutput {
  @IDField(() => ID)
  id: string

  @FilterableField()
  comment: string;
}
