import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { RoleEnum } from 'src/common/roles.enum';
import { UserOutput } from '../user/dto/user.output';
import { NftInput } from './dto/nft.input';
import { NftRepository } from './nft.repository';

@Injectable()
export class NftService {
  constructor(private readonly nftRepository: NftRepository) {}

  async createNft(user: UserOutput, nft: NftInput) {
    return await this.nftRepository.save({ ...nft, user: user, creator: user });
  }

  async findNftById(nftId: string) {
    const nft = await this.nftRepository.findOneNft(nftId);
    if (!nft) throw new BadRequestException('Nft not found');
    return nft;
  }

  async deleteNftById(user: UserOutput, nftId: string) {
    const nft = await this.nftRepository.findOne(nftId);
    if (!nft) throw new BadRequestException('Nft not found');
    if (user.role.includes(RoleEnum.ADMIN)) {
      await this.nftRepository.softDelete(nftId);
    }
    else if (nft.user.id !== user.id) {
      throw new ForbiddenException('Method not allowed');
    }
    await this.nftRepository.softDelete(nftId);
    return { message: "Successfully deleted nft " + nftId };
  }
}
