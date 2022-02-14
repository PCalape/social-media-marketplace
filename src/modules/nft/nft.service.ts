import { Injectable } from '@nestjs/common';
import { UserOutput } from '../user/dto/user.output';
import { NftInput } from './dto/nft.input';
import { NftRepository } from './nft.repository';

@Injectable()
export class NftService {
  constructor(private readonly nftRepository: NftRepository) {}

  async createNft(user: UserOutput, nft: NftInput) {
    return await this.nftRepository.save({ ...nft, user: user });
  }

  async findNfts(nftId: string) {
    return await this.nftRepository.findNfts(nftId);
  }

  async findNftById(nftId: string) {
    return await this.nftRepository.findOne(nftId);
  }
}
