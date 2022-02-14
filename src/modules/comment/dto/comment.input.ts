import { ObjectType, Field } from '@nestjs/graphql';
import { GenderEnum } from 'src/common/gender.enum';
import { RoleEnum } from 'src/common/roles.enum';
@ObjectType()
export class CommentInput {
  @Field()
  comment: string;
}
