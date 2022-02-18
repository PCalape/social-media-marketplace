import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { IsNumber, Min } from 'class-validator';
import { IsImage } from 'src/common/image.validator';

@InputType()
export class NftInput {

  @Field()
  @IsImage()
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
