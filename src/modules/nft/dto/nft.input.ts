import { ObjectType, Field, InputType } from '@nestjs/graphql';

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
  price: number;
}
