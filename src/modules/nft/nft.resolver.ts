import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { GqlAuth } from '../auth/guards/auth-gql.guard';
import { NftOutput } from './dto/nft.output';
import { GetUser } from '../../common/get-user.decorator';
import { NftService } from './nft.service';
import { UserOutput } from '../user/dto/user.output';
import { NftInput } from './dto/nft.input';
import { UUIDInput } from 'src/common/uuid.input';
import { StringOutput } from 'src/common/string.output';

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

  @UseGuards(GqlAuth)
  @Mutation(() => StringOutput)
  deleteNft(@GetUser() user: UserOutput, @Args('input') nftId: UUIDInput) {
    return this.nftService.deleteNftById(user, nftId.uuid);
  }

  @UseGuards(GqlAuth)
  @Query(() => NftOutput)
  getNft(@Args('input') nftId: UUIDInput) {
    return this.nftService.findNftById(nftId.uuid);
  }
}
