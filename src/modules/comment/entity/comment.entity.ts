import { BaseEntity } from 'src/common/base.entity';
import { NftEntity } from 'src/modules/nft/entity/nft.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('comments')
export class CommentEntity extends BaseEntity {
  @Column()
  comment: string;

  //connection to nft
  @ManyToOne(type => NftEntity, nft => nft.id)
  nft: NftEntity;
}
