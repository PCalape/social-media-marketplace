import { Injectable } from '@nestjs/common';
import { NftRepository } from './nft.repository';

@Injectable()
export class NftService {
  constructor(private readonly nftRepository: NftRepository) {}

  async findNfts(nftId: string) {
    return await this.nftRepository.findNfts(nftId);
  }

  async findNftById(nftId: string) {
    return await this.nftRepository.findOne(nftId);
  }
}
