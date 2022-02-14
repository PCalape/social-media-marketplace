import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionResolver } from './transaction.resolver';
import { TransactionRepository } from './transaction.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([TransactionRepository]),
  ],
  providers: [TransactionService, TransactionResolver],
  exports: [TransactionService, TypeOrmModule.forFeature([TransactionRepository])],
})
export class TransactionModule {}
