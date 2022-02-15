import { BaseEntity } from 'src/common/base.entity';
import { CommentEntity } from 'src/modules/comment/entity/comment.entity';
import { TransactionEntity } from 'src/modules/transaction/entity/transaction.entity';
import { UserEntity } from 'src/modules/user/entity/user.entity';
import { Column, DeleteDateColumn, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity('nft')
export class NftEntity extends BaseEntity {
  @Column()
  image: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  category: string;

  @Column({ type: 'numeric', precision: 18, scale: 8, default: 1 })
  price: number;
  
  //soft delete
  @DeleteDateColumn()
  deletedAt?: Date;

  //connection to user
  @ManyToOne(type => UserEntity, user => user.nfts, { eager: true })
  user: UserEntity;

  //connection to comment
  @OneToMany(type => CommentEntity, comment => comment.nft, {eager: true})
  comments: CommentEntity[]

  @OneToMany(type => TransactionEntity, transaction => transaction.nft)
  transactions: TransactionEntity[]
}
