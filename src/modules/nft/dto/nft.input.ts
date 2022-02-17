import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { IsNumber, Min } from 'class-validator';

@InputType()
export class NftInput {

  @Field()
  image: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  category: string;

  @Field()
  @IsNumber()
  @Min(0.1)
  price: number;
}
