import { registerEnumType } from '@nestjs/graphql';

export enum RoleEnum {
  USER = 'user',
  ADMIN = 'admin',
}

registerEnumType(RoleEnum, { name: 'RoleEnum', description: 'Role' });
