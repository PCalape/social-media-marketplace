import { ObjectType, Field } from '@nestjs/graphql';
import { CommentOutput } from 'src/modules/comment/dto/comment.output';
import { UserOutput } from 'src/modules/user/dto/user.output';

@ObjectType()
export class NftOutput {
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

  @Field(() => [CommentOutput], {nullable: true})
  comments: CommentOutput[];
}
