import { type } from 'os';
import { BaseEntity } from 'src/common/base.entity';
import { GenderEnum } from 'src/common/gender.enum';
import { RoleEnum } from 'src/common/roles.enum';
import { NftEntity } from 'src/modules/nft/entity/nft.entity';
import { Column, DeleteDateColumn, Entity, OneToMany } from 'typeorm';

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

  //soft delete
  @DeleteDateColumn()
  deletedAt?: Date;

  //connection to nft
  @OneToMany(type => NftEntity, nft => nft.id)
  nft: NftEntity
}
