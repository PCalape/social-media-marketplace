import { BaseEntity } from 'src/common/base.entity';
import { UserEntity } from 'src/modules/user/entity/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

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

  @Column()
  price: number;

  @ManyToOne(type => UserEntity, user => user.id)
  user: UserEntity;
}
