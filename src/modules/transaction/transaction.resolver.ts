import { UseGuards } from '@nestjs/common';
import { Resolver, Query } from '@nestjs/graphql';
import { GqlAuth } from '../auth/guards/auth-gql.guard';
import { TransactionOutput } from './dto/transaction.output';
import { TransactionService } from './transaction.service';
import { RoleEnum } from 'src/common/roles.enum';
import { Roles } from 'src/common/role.decorator';
import { AuthorizationGuard } from '../auth/guards/authorization-guard';

@Resolver(() => TransactionOutput)
export class TransactionResolver {
  constructor(
    private readonly transactionService: TransactionService,
  ) {}

  @UseGuards(GqlAuth, AuthorizationGuard)
  @Roles(RoleEnum.ADMIN)
  @Query(() => [TransactionOutput])
  getTransactions() {
    return this.transactionService.findTransactions();
  }
}
