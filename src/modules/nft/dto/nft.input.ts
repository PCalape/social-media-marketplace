import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
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
