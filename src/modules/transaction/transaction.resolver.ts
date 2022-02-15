import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { GetUser } from 'src/common/get-user.decorator';
import { UUIDInput } from 'src/common/uuid.input';
import { GqlAuth } from '../auth/guards/auth-gql.guard';
import { UserOutput } from '../user/dto/user.output';
import { TransactionOutput } from './dto/transaction.output';
import { TransactionService } from './transaction.service';

@Resolver(() => TransactionOutput)
export class TransactionResolver {
  constructor(
    private readonly transactionService: TransactionService,
  ) {}

  @UseGuards(GqlAuth)
  @Mutation(() => String)
  buyNft(@GetUser() user: UserOutput, @Args('input') nftId: UUIDInput) {
    this.transactionService.createTransaction(user, nftId.uuid);
    return "Successfully bought NFT with ID: " + nftId.uuid;
  }
}
