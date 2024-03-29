import { ObjectType, Field } from '@nestjs/graphql';
import { GenderEnum } from 'src/common/gender.enum';
import { RoleEnum } from 'src/common/roles.enum';
@ObjectType()
export class UserOutput {
  @Field()
  id: string;

  @Field()
  username: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  gender: GenderEnum;

  @Field()
  role: RoleEnum;

  @Field()
  birthDate: Date;

  @Field()
  aboutMe: string;
}
