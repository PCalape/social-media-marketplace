import { from } from 'rxjs';
import { BaseEntity } from 'src/common/base.entity';
import { GenderEnum } from 'src/common/gender.enum';
import { RoleEnum } from 'src/common/roles.enum';
import { NftEntity } from 'src/modules/nft/entity/nft.entity';
import { UserEntity } from 'src/modules/user/entity/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('transactions')
export class TransactionEntity extends BaseEntity {
  
  //connection to user
  @ManyToOne(type => UserEntity, user => user.transactions)
  from: UserEntity;

  //connection to nft
  @ManyToOne(type => NftEntity, nft => nft.transactions)
  nft: NftEntity;

  @Column()
  amount: string;
}
