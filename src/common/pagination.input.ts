import { IsNumber, Min, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PaginationParams {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Field({ nullable: true })
  offset?: number;
 
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Field({ nullable: true })
  limit?: number;
}
