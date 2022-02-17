import { Field, ObjectType } from '@nestjs/graphql';
import { NftOutput } from './nft.output';

@ObjectType()
export class NftPaginationOutput {

  @Field(() => [NftOutput])
  output: NftOutput[];

  @Field()
  total: number;

  @Field()
  count: number;

  @Field()
  offset: number;

  @Field()
  limit: number;

  @Field()
  currentPage: number;

  @Field()
  totalPage: number;
}
