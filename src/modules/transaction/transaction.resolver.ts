import { UseGuards } from '@nestjs/common';
import { Resolver, Query } from '@nestjs/graphql';
import { GqlAuth } from '../auth/guards/auth-gql.guard';
import { UserOutput } from './dto/transaction.output';
import { GetUser } from '../../common/get-user.decorator';
import { UserService } from './transaction.service';
import { RoleEnum } from 'src/common/roles.enum';
import { Roles } from 'src/common/role.decorator';
import { AuthorizationGuard } from '../auth/guards/authorization-guard';

@Resolver(() => UserOutput)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
  ) {}

  @UseGuards(GqlAuth, AuthorizationGuard)
  @Roles(RoleEnum.ADMIN)
  @Query(() => [UserOutput])
  getUsers(@GetUser() user: UserOutput) {
    return this.userService.findUsers(user.id);
  }

  @UseGuards(GqlAuth)
  @Query(() => [UserOutput])
  viewProfile(@GetUser() user: UserOutput) {
    return this.userService.viewProfile(user.id);
  }
}
