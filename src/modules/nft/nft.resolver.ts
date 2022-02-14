import { UseGuards } from '@nestjs/common';
import { Resolver, Query } from '@nestjs/graphql';
import { GqlAuth } from '../auth/guards/auth-gql.guard';
import { NftOutput } from './dto/nft.output';
import { GetUser } from '../../common/get-user.decorator';
import { NftService } from './nft.service';
import { RoleEnum } from 'src/common/roles.enum';
import { Roles } from 'src/common/role.decorator';
import { AuthorizationGuard } from '../auth/guards/authorization-guard';
import { NftInput } from './dto/nft.input';
import { UserOutput } from '../user/dto/user.output';
import { UserService } from '../user/user.service';

@Resolver(() => NftOutput)
export class NftResolver {
  constructor(
    private readonly userService: UserService,
    private readonly nftService: NftService,
  ) {}

  @UseGuards(GqlAuth, AuthorizationGuard)
  @Roles(RoleEnum.ADMIN)
  @Query(() => [NftOutput])
  getUsers(@GetUser() user: UserOutput) {
    return this.userService.findUsers(user.id);
  }

  @UseGuards(GqlAuth)
  @Query(() => [NftInput])
  viewProfile(@GetUser() user: UserOutput) {
    return this.userService.viewProfile(user.id);
  }
}
