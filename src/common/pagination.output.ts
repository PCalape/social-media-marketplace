import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CommentOutput } from 'src/modules/comment/dto/comment.output';

@ObjectType()
export class PaginationOutput {

  @Field(() => [CommentOutput])
  output: CommentOutput[];

  @Field()
  total: number;

  @Field()
  count: number;

  @Field()
  offset: number;

  @Field()
  limit: number;

  @Field()
  currentPage: number;

  @Field()
  totalPage: number;
}
