import { InputType, Field } from '@nestjs/graphql';
import { GenderEnum } from 'src/common/gender.enum';
import {
  IsEnum,
  IsAlpha,
  IsEmail,
  IsAlphanumeric,
  Length,
  MaxLength,
  Matches,
} from 'class-validator';
import { RoleEnum } from 'src/common/roles.enum';

@InputType()
export class RegisterUserInput {
  @Field()
  @IsAlphanumeric()
  @Length(4, 20)
  username: string;

  @Field()
  @IsAlpha()
  @Length(1, 60)
  firstName: string;

  @Field()
  @IsAlpha()
  @Length(1, 60)
  lastName: string;

  @Field()
  @IsEmail()
  @MaxLength(70)
  email: string;

  @Field(() => GenderEnum)
  @IsEnum(GenderEnum)
  gender: GenderEnum;

  @Field()
  @Length(8, 32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password too weak.',
  })
  password: string;

  @Field(() => RoleEnum)
  @IsEnum(RoleEnum)
  role: RoleEnum;
}
