import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
import { CommentOutput } from 'src/modules/comment/dto/comment.output';

@ObjectType()
export class PaginationOutput {

  @Field(() => [CommentOutput])
  output: CommentOutput[];

  @Field()
  total: number;
}
