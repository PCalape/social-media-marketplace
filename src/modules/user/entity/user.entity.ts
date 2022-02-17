import { HttpException, HttpStatus } from '@nestjs/common';
import { BaseEntity } from 'src/common/base.entity';
import { GenderEnum } from 'src/common/gender.enum';
import { RoleEnum } from 'src/common/roles.enum';
import { CommentEntity } from 'src/modules/comment/entity/comment.entity';
import { NftEntity } from 'src/modules/nft/entity/nft.entity';
import { TransactionEntity } from 'src/modules/transaction/entity/transaction.entity';
import { Column, DeleteDateColumn, Entity, JoinColumn, OneToMany } from 'typeorm';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column({ unique: true })
  username: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  gender: GenderEnum;

  @Column()
  password: string;

  @Column()
  role: RoleEnum;

  @Column()
  birthDate: Date;

  @Column()
  aboutMe: string;

  @Column({ type: 'numeric', precision: 18, scale: 8, default: 888 })
  balance: number = 888;

  //soft delete
  @DeleteDateColumn()
  deletedAt?: Date;

  //connection to nft as owner
  @OneToMany(type => NftEntity, nft => nft.user)
  nfts: NftEntity[]

  //connection to nft as creator
  @OneToMany(type => NftEntity, nftsCreated => nftsCreated.creator)
  nftsCreated: NftEntity[]

  //connection to comment
  @OneToMany(type => CommentEntity, comment => comment.user)
  comments: CommentEntity[]

  //connection to transaction
  @OneToMany(type => TransactionEntity, transaction => transaction.from)
  transactions: TransactionEntity[]

  addBalance(amount: number) {
    this.balance = +this.balance + +amount;
  }

  decreaseBalance(amount: number) {
    if (amount > this.balance) throw new HttpException('Not enough balance', HttpStatus.BAD_REQUEST);
    this.balance = +this.balance - +amount;
  }
}
