import { BadRequestException, Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { NftService } from '../nft/nft.service';
import { UserOutput } from '../user/dto/user.output';
import { UserService } from '../user/user.service';
import { TransactionEntity } from './entity/transaction.entity';
import { TransactionRepository } from './transaction.repository';

@Injectable()
export class TransactionService {
  constructor(private readonly transactionRepository: TransactionRepository,
              private readonly connection: Connection,
              private readonly nftService: NftService,
              private readonly userService: UserService,) {}

  async createTransaction(user: UserOutput, nftId: string) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const nft = await this.nftService.findNftById(nftId);
      if (!nft) throw new BadRequestException('NFT not found');
      const userTo = nft.user;
      const [userFrom] = await this.userService.viewProfile(user.id);
      if (user.id === userTo.id) throw new BadRequestException('NFT is currently owned');
      if (userFrom.balance < nft.price) throw new BadRequestException('Not enough balance');
      userFrom.decreaseBalance(nft.price);
      userTo.addBalance(nft.price);
      nft.user = userFrom;
      nft.price = nft.price * 1.1;
      await queryRunner.manager.save(userFrom);
      await queryRunner.manager.save(userTo);
      await queryRunner.manager.save(nft);
      await queryRunner.manager.save(Object.assign(new TransactionEntity(), 
        { nft: nft, from: userFrom, amount: nft.price }));
      await queryRunner.commitTransaction();
    } catch (err) {
      // since we have errors lets rollback the changes we made
      console.log(err)
      await queryRunner.rollbackTransaction();
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }

  async findTransactions() {
    return await this.transactionRepository.find();
  }
}
