import { Field, ObjectType } from "@nestjs/graphql";
import { PaginationParams } from "src/common/pagination.input";

@ObjectType()
export class LoaderDto {
  @Field()
  nftId: string;

  @Field()
  pagination: PaginationParams;
}