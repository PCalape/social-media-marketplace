import { Field, InputType, PartialType } from '@nestjs/graphql';
import { GenderEnum } from 'src/common/gender.enum';
import { RoleEnum } from 'src/common/roles.enum';
import { UserOutput } from './user.output';

@InputType()
export class UserInput {

  @Field({nullable: true})
  username?: string;

  @Field({nullable: true})
  firstName?: string;

  @Field({nullable: true})
  lastName?: string;

  @Field({nullable: true})
  email?: string;

  @Field({nullable: true})
  gender?: GenderEnum;

  @Field({nullable: true})
  role?: RoleEnum;

  @Field({nullable: true})
  birthDate?: Date;

  @Field({nullable: true})
  aboutMe?: string;
}
