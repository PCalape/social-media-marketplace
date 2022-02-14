import { BaseEntity } from 'src/common/base.entity';
import { CommentEntity } from 'src/modules/comment/entity/comment.entity';
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

  @Column()
  price: number;
  
  //soft delete
  @DeleteDateColumn()
  deletedAt?: Date;

  //connection to user
  @ManyToOne(type => UserEntity, user => user.id)
  user: UserEntity;

  //connection to comment
  @OneToMany(type => CommentEntity, comment => comment.id)
  comment: CommentEntity[]
}
