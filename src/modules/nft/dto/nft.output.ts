import { ObjectType, Field } from '@nestjs/graphql';
import { CommentOutput } from 'src/modules/comment/dto/comment.output';
import { CommentPaginationOutput } from 'src/modules/comment/dto/comment.pagination.output';
import { UserOutput } from 'src/modules/user/dto/user.output';

@ObjectType()
export class NftOutput {
  @Field()
  id: string;

  @Field()
  image: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  category: string;

  @Field()
  price: number;

  @Field(() => UserOutput)
  user: UserOutput;

  @Field(() => UserOutput)
  creator: UserOutput;

  @Field(() => CommentPaginationOutput, {nullable: true})
  comments: CommentPaginationOutput;
}
