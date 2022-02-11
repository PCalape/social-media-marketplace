import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserOutput } from '../user/dto/user.output';
import { AuthService } from './auth.service';
import { AuthCredentialsInput } from './dto/auth-credentials.input';
import { AuthCredentialsOutput } from './dto/auth-credentials.output';
import { RegisterUserInput } from './dto/register-user.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => AuthCredentialsOutput)
  login(@Args('input') input: AuthCredentialsInput) {
    return this.authService.login(input);
  }

  @Mutation(() => UserOutput)
  register(@Args('input') input: RegisterUserInput) {
    return this.authService.register(input);
  }
}
