import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class CommentInput {
  @Field()
  comment: string;

  @Field()
  @IsUUID()
  nftId: string;
}
