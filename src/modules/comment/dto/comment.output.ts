import { ObjectType, ID, Field } from '@nestjs/graphql';

@ObjectType()
export class CommentOutput {
  @Field()
  id: string

  @Field()
  comment: string;
}
