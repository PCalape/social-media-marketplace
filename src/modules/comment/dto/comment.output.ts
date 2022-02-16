import { ObjectType, ID } from '@nestjs/graphql';
import { FilterableField, IDField, KeySet } from '@nestjs-query/query-graphql';

@ObjectType()
@KeySet(['id'])
export class CommentOutput {
  @IDField(() => ID)
  id: string

  @FilterableField()
  comment: string;
}
