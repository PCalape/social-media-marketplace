import { Field, InputType } from '@nestjs/graphql';
import { IsAlphanumeric, Length } from 'class-validator';

@InputType()
export class AuthCredentialsInput {
  @Field()
  @IsAlphanumeric()
  @Length(4, 20)
  username: string;

  @Field()
  @Length(8, 32)
  password: string;
}
