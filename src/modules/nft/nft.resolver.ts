import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { GqlAuth } from '../auth/guards/auth-gql.guard';
import { NftOutput } from './dto/nft.output';
import { GetUser } from '../../common/get-user.decorator';
import { NftService } from './nft.service';
import { UserOutput } from '../user/dto/user.output';
import { NftInput } from './dto/nft.input';

@Resolver(() => NftOutput)
export class NftResolver {
  constructor(
    private readonly nftService: NftService,
  ) {}

  @UseGuards(GqlAuth)
  @Mutation(() => NftOutput)
  createNft(@GetUser() user: UserOutput, @Args('input') input: NftInput) {
    return this.nftService.createNft(user, input);
  }
}
