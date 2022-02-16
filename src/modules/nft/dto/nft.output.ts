import { ObjectType, Field } from '@nestjs/graphql';
import { CommentOutput } from 'src/modules/comment/dto/comment.output';
import { CommentEntity } from 'src/modules/comment/entity/comment.entity';
import { UserOutput } from 'src/modules/user/dto/user.output';
import { UserEntity } from 'src/modules/user/entity/user.entity';

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

  @Field(() => CommentOutput, {nullable: true})
  comments: CommentOutput[];
}
