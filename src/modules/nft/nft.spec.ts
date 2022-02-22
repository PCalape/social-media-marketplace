import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { NftEntity } from './entity/nft.entity';
import { NftRepository } from './nft.repository';
import { NftService } from './nft.service';
import { UserOutput } from '../user/dto/user.output';
import { UserEntity } from '../user/entity/user.entity';
import { NftInput } from './dto/nft.input';
import { RoleEnum } from 'src/common/roles.enum';

describe('NftService', () => {
  let nftService: NftService;
  let nftRepository: NftRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NftService, NftRepository],
    }).compile();

    nftService = await module.resolve(NftService);
    nftRepository = await module.resolve(NftRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('nftService', () => {
    it('should be defined', () => {
      expect(nftService).toBeDefined();
    });
  });

  describe('createNft', () => {
    it('should call save in nft repository and return nft entity', async () => {
      const user = new UserOutput();
      user.id = 'test user';
      const nft = new NftInput();
      const nftEntity = new NftEntity();
      nftEntity.id = 'test nft';

      jest.spyOn(nftRepository, 'save').mockImplementation(async () => nftEntity);

      const nftOutput = await nftService.createNft(user, nft);
      expect(nftOutput).toBe(nftEntity);
      expect(nftRepository.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('findNftById', () => {
    it('should call findOneNft in nft repository and return nft entity', async () => {
      const nftId = 'test nft';
      const nftEntity = new NftEntity();
      nftEntity.id = nftId;

      jest.spyOn(nftRepository, 'findOneNft').mockImplementation(async () => nftEntity);

      const nftOutput = await nftService.findNftById(nftId);
      expect(nftOutput).toBe(nftEntity);
      expect(nftRepository.findOneNft).toHaveBeenCalledTimes(1);
    });
  });

  describe('findNftById', () => {
    it('should throw BadRequestException when nft is not found', async () => {
      const nftId = 'test nft';

      jest.spyOn(nftRepository, 'findOneNft').mockImplementation(null);

      await expect(nftService.findNftById(nftId))
        .rejects.toThrowError(BadRequestException);
    });
  });

  describe('findNfts', () => {
    it('should call findNfts in nft repository and return nfts', async () => {
      const nft = new NftEntity();
      nft.id = 'test nft';

      jest.spyOn(nftRepository, 'findNfts').mockImplementation(async () => {return { output: [nft], total: 1, count: 1, offset: 0, limit: 1, currentPage: 1, totalPage: 1 }});

      const nftOutput = await nftService.findNfts(null);
      expect(nftOutput.output).toStrictEqual([nft]);
      expect(nftRepository.findNfts).toHaveBeenCalledTimes(1);
    });
  });

  describe('deleteNftById', () => {
    it('should call softDelete in nft repository and return message', async () => {
      const user = new UserOutput();
      user.id = 'test user';
      user.role = RoleEnum.USER;
      const nft = new NftEntity();
      nft.id = 'test nft';
      nft.user = user as UserEntity;

      jest.spyOn(nftRepository, 'findOne').mockImplementation(async () => nft);
      jest.spyOn(nftRepository, 'softDelete').mockImplementation(null);

      const nftOutput = await nftService.deleteNftById(user, nft.id);
      expect(nftOutput).toStrictEqual({ message: "Successfully deleted nft " + nft.id });
      expect(nftRepository.softDelete).toHaveBeenCalledTimes(1);
    });
  });

  describe('deleteNftById', () => {
    it('should call softDelete in nft repository and return message when role is admin', async () => {
      const user = new UserOutput();
      user.id = 'test user';
      user.role = RoleEnum.ADMIN;
      const nft = new NftEntity();
      nft.id = 'test nft';
      nft.user = new UserOutput() as UserEntity;

      jest.spyOn(nftRepository, 'findOne').mockImplementation(async () => nft);
      jest.spyOn(nftRepository, 'softDelete').mockImplementation(null);

      const nftOutput = await nftService.deleteNftById(user, nft.id);
      expect(nftOutput).toStrictEqual({ message: "Successfully deleted nft " + nft.id });
      expect(nftRepository.softDelete).toHaveBeenCalledTimes(1);
    });
  });

  describe('deleteNftById', () => {
    it('should throw BadRequestException when nft is not found', async () => {
      const user = new UserOutput();
      user.id = 'test user';
      user.role = RoleEnum.USER;
      const nft = new NftEntity();
      nft.id = 'test nft';
      nft.user = user as UserEntity;

      jest.spyOn(nftRepository, 'findOne').mockImplementation(null);

      await expect(nftService.deleteNftById(user, nft.id))
        .rejects.toThrowError(BadRequestException);
    });
  });

  describe('deleteNftById', () => {
    it('should throw ForbiddenException when deleting not owned nft', async () => {
      const user = new UserOutput();
      user.id = 'test user';
      user.role = RoleEnum.USER;
      const nft = new NftEntity();
      nft.id = 'test nft';
      nft.user = new UserOutput() as UserEntity;

      jest.spyOn(nftRepository, 'findOne').mockImplementation(async () => nft);

      await expect(nftService.deleteNftById(user, nft.id))
        .rejects.toThrowError(ForbiddenException);
    });
  });
});
