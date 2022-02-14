import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class TransactionOutput {
  @Field()
  from: string;

  @Field()
  toNft: string;

  @Field()
  amount: string;
}
