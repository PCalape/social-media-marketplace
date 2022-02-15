import { BaseEntity } from 'src/common/base.entity';
import { NftEntity } from 'src/modules/nft/entity/nft.entity';
import { UserEntity } from 'src/modules/user/entity/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('comments')
export class CommentEntity extends BaseEntity {
  @Column()
  comment: string;

  //connection to nft
  @ManyToOne(type => NftEntity, nft => nft.comments)
  nft: NftEntity;

  //connection to user
  @ManyToOne(type => UserEntity, user => user.comments)
  user: UserEntity;
}
