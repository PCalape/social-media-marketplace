import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { GetUser } from 'src/common/get-user.decorator';
import { StringOutput } from 'src/common/string.output';
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
  @Mutation(() => StringOutput)
  buyNft(@GetUser() user: UserOutput, @Args('nftId') nftId: UUIDInput) {
    return this.transactionService.createTransaction(user, nftId.uuid);
  }
}
