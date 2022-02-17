import { IsNumber, Min, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { Field, InputType } from '@nestjs/graphql';
import { NftDirectionEnum, NftSortEnum } from './nftsort.enum';

@InputType()
export class PaginationParams {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Field({ nullable: true })
  page?: number;
 
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Field({ nullable: true })
  limit?: number;

  @IsOptional()
  @Field({ nullable: true })
  search?: string;

  @IsOptional()
  @Field(() => NftSortEnum, { nullable: true })
  sortBy?: NftSortEnum;

  @IsOptional()
  @Field(() => NftDirectionEnum, { nullable: true })
  direction?: NftDirectionEnum;
}
