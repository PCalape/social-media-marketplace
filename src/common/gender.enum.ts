import { registerEnumType } from '@nestjs/graphql';
export enum GenderEnum {
  MALE = 'Male',
  FEMALE = 'Female',
}

registerEnumType(GenderEnum, { name: 'GenderEnum', description: 'Gender' });
