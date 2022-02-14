import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { GqlAuth } from '../auth/guards/auth-gql.guard';
import { UserOutput } from './dto/user.output';
import { GetUser } from '../../common/get-user.decorator';
import { UserService } from './user.service';
import { RoleEnum } from 'src/common/roles.enum';
import { Roles } from 'src/common/role.decorator';
import { AuthorizationGuard } from '../auth/guards/authorization-guard';
import { UserWalletBalance } from './dto/user.wallet.balance';
import { UserInput } from './dto/user.input';

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

  @UseGuards(GqlAuth)
  @Query(() => [UserOutput])
  getUserById(@Args('userId') userId: string) {
    return this.userService.viewProfile(userId);
  }

  @UseGuards(GqlAuth)
  @Query(() => [UserWalletBalance])
  viewBalance(@GetUser() user: UserOutput) {
    return this.userService.viewProfile(user.id);
  }

  @UseGuards(GqlAuth)
  @Mutation(() => UserOutput)
  updateProfile(@GetUser() user: UserOutput, @Args('input') input: UserInput) {
    return this.userService.updateProfile(user.id, input);
  }

  @UseGuards(GqlAuth, AuthorizationGuard)
  @Roles(RoleEnum.ADMIN)
  @Mutation(() => String)
  deleteUser(@Args('userId') userId: string) {
    this.userService.deleteUserById(userId);
    return "Successfully deleted user " + userId;
  }

  @UseGuards(GqlAuth, AuthorizationGuard)
  @Roles(RoleEnum.ADMIN)
  @Mutation(() => String)
  restoreUser(@Args('userId') userId: string) {
    this.userService.restoreUserById(userId);
    return "Successfully restored user " + userId;
  }
}
