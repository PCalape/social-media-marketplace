import { Module } from '@nestjs/common';
import { UserService } from './comment.service';
import { UserResolver } from './comment.resolver';
import { UserRepository } from './comment.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
  ],
  providers: [UserService, UserResolver],
  exports: [UserService, TypeOrmModule.forFeature([UserRepository])],
})
export class UserModule {}
