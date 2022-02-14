import { Module } from '@nestjs/common';
import { NftService } from './nft.service';
import { NftResolver } from './nft.resolver';
import { NftRepository } from './nft.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([NftRepository]),
    UserModule
  ],
  providers: [NftService, NftResolver],
  exports: [NftService, TypeOrmModule.forFeature([NftRepository])],
})
export class NftModule {}
