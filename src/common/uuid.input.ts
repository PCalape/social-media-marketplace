import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class UUIDInput {

  @Field()
  @IsUUID()
  uuid: string;
}
