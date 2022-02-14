import { Module } from '@nestjs/common';
import { UserService } from './transaction.service';
import { UserResolver } from './transaction.resolver';
import { UserRepository } from './transaction.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
  ],
  providers: [UserService, UserResolver],
  exports: [UserService, TypeOrmModule.forFeature([UserRepository])],
})
export class UserModule {}
