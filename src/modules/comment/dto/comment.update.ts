import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class CommentUpdate {
  @Field()
  @IsUUID()
  id: string;

  @Field()
  comment: string;
}
