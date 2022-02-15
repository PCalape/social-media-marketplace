import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionResolver } from './transaction.resolver';
import { TransactionRepository } from './transaction.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { NftModule } from '../nft/nft.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TransactionRepository]),
    UserModule,
    NftModule,
  ],
  providers: [TransactionService, TransactionResolver],
  exports: [TransactionService, TypeOrmModule.forFeature([TransactionRepository])],
})
export class TransactionModule {}
