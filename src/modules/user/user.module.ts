import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
  ],
  providers: [UserService, UserResolver],
  exports: [UserService, TypeOrmModule.forFeature([UserRepository])],
})
export class UserModule {}
