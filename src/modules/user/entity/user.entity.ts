import { BaseEntity } from 'src/common/base.entity';
import { GenderEnum } from 'src/common/gender.enum';
import { RoleEnum } from 'src/common/roles.enum';
import { Column, Entity } from 'typeorm';

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
}
