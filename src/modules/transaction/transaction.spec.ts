import { Test, TestingModule } from "@nestjs/testing";
import { Connection, getConnection } from "typeorm";
import { NftRepository } from "../nft/nft.repository";
import { NftService } from "../nft/nft.service";
import { UserOutput } from "../user/dto/user.output";
import { UserRepository } from "../user/user.repository";
import { UserService } from "../user/user.service";
import { TransactionRepository } from "./transaction.repository";
import { TransactionService } from "./transaction.service";
import * as typeorm from "typeorm";

describe('TransactionService', () => {
    let transactionService: TransactionService;
    let transactionRepository: TransactionRepository;
    let nftService: NftService;
    let nftRepository: NftRepository;
    let userService: UserService;
    let userRepository: UserRepository;
    let connection: Connection = typeorm.getConnection('configService');
  
    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [TransactionService, TransactionRepository,
                        NftService, NftRepository,
                        UserService, UserRepository,
                        Connection],
        }).compile();
    
        transactionService = await module.resolve(TransactionService);
        transactionRepository = await module.resolve(TransactionRepository);
        nftService = await module.resolve(NftService);
        nftRepository = await module.resolve(NftRepository);
        userService = await module.resolve(UserService);
        userRepository = await module.resolve(UserRepository);
        connection = await module.resolve(Connection);
    });
  
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('transactionService', () => {
        it('should be defined', () => {
          expect(transactionService).toBeDefined();
        });
    });

    describe('transactionService', () => {
        it('should call save in nft repository and return nft entity', async () => {
            const user = new UserOutput();
            user.id = 'test user';
            const nftId = 'test nft';
            // const queryRunner = connection.createQueryRunner();
            // const manager = queryRunner.manager;
      
            // jest.spyOn(queryRunner, 'connect').mockImplementation(null);
            // jest.spyOn(queryRunner, 'startTransaction').mockImplementation(null);
            // jest.spyOn(queryRunner, 'rollbackTransaction').mockImplementation(null);
            // jest.spyOn(queryRunner, 'release').mockImplementation(null);
            // jest.spyOn(queryRunner, 'commitTransaction').mockImplementation(null);
            // jest.spyOn(manager, 'save').mockImplementation(null);
      
            const nftOutput = await transactionService.createTransaction(user, nftId);
            // expect(queryRunner.commitTransaction).toHaveBeenCalledTimes(1);
          });
    });
});