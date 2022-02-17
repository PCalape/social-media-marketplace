import { registerEnumType } from '@nestjs/graphql';

export enum NftSortEnum {
  TITLE = 'title',
  DESCRIPTION = 'description',
  CATEGORY = 'category',
  USER = 'user',
  CREATOR = 'creator',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
}

export enum NftDirectionEnum {
  ASC = 'ASC',
  DESC = 'DESC',
}

registerEnumType(NftSortEnum, { name: 'NftSortEnum', description: 'NftSort' });
registerEnumType(NftDirectionEnum, { name: 'NftDirectionEnum', description: 'NftDirection' });
