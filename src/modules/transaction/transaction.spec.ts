import { BadRequestException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { Connection, createConnection, getConnection, QueryRunner } from "typeorm";
import { NftEntity } from "../nft/entity/nft.entity";
import { NftRepository } from "../nft/nft.repository";
import { NftService } from "../nft/nft.service";
import { UserOutput } from "../user/dto/user.output";
import { UserEntity } from "../user/entity/user.entity";
import { UserRepository } from "../user/user.repository";
import { UserService } from "../user/user.service";
import { TransactionRepository } from "./transaction.repository";
import { TransactionService } from "./transaction.service";

describe('TransactionService', () => {
    let transactionService: TransactionService;
    let transactionRepository: TransactionRepository;
    let nftService: NftService;
    let nftRepository: NftRepository;
    let userService: UserService;
    let userRepository: UserRepository;
    let connection: Connection;

    const qr = {
        manager: {},
    } as QueryRunner;

    class ConnectionMock {
        createQueryRunner(mode?: "master" | "slave"): QueryRunner {
            return qr;
        }
      }
  
    beforeAll(async () => {
        Object.assign(qr.manager, {
            save: jest.fn()
        });
        qr.connect = jest.fn();
        qr.release = jest.fn();
        qr.startTransaction = jest.fn();
        qr.commitTransaction = jest.fn();
        qr.rollbackTransaction = jest.fn();
        qr.release = jest.fn();

        const module: TestingModule = await Test.createTestingModule({
            providers: [TransactionService, TransactionRepository,
                        NftService, NftRepository,
                        UserService, UserRepository,
                        { provide: Connection, useClass: ConnectionMock }],
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
            user.id = 'test user from';
            const userFrom = new UserEntity();
            userFrom.id = user.id;
            const userTo = new UserEntity();
            userTo.id = 'test user to';
            const nftId = 'test nft';
            const nft = new NftEntity();
            nft.id = nftId;
            nft.user = userTo;
            nft.price = 10;

            const queryRunner = connection.createQueryRunner();
            const manager = queryRunner.manager;
      
            jest.spyOn(queryRunner, 'connect').mockImplementation(null);
            jest.spyOn(queryRunner, 'startTransaction').mockImplementation(null);
            jest.spyOn(queryRunner, 'rollbackTransaction').mockImplementation(null);
            jest.spyOn(queryRunner, 'release').mockImplementation(null);
            jest.spyOn(queryRunner, 'commitTransaction').mockImplementation(null);
            jest.spyOn(manager, 'save').mockImplementation(null);

            jest.spyOn(nftService, 'findNftById').mockImplementation(async () => nft);
            jest.spyOn(userService, 'viewProfile').mockImplementation(async () => [userFrom]);
      
            const transactionOutput = await transactionService.createTransaction(user, nftId);
            expect(connection.createQueryRunner().commitTransaction).toHaveBeenCalledTimes(1);
            expect(transactionOutput).toStrictEqual({ message: "Successfully bought NFT with ID: " + nftId });
            expect(userFrom.balance).toBe(878);
            expect(userTo.balance).toBe(898);
            expect(nft.price).toBe(11);
        });
    });

    describe('transactionService', () => {
        it('should call throw BadRequestException when nft is not found', async () => {
            const user = new UserOutput();
            user.id = 'test user from';
            const nftId = 'test nft';

            const queryRunner = connection.createQueryRunner();
            const manager = queryRunner.manager;
      
            jest.spyOn(queryRunner, 'connect').mockImplementation(null);
            jest.spyOn(queryRunner, 'startTransaction').mockImplementation(null);
            jest.spyOn(queryRunner, 'rollbackTransaction').mockImplementation(null);
            jest.spyOn(queryRunner, 'release').mockImplementation(null);
            jest.spyOn(queryRunner, 'commitTransaction').mockImplementation(null);
            jest.spyOn(manager, 'save').mockImplementation(null);

            jest.spyOn(nftService, 'findNftById').mockImplementation(null);
      
            const transactionOutput = await transactionService.createTransaction(user, nftId);
            expect(transactionOutput).toStrictEqual({ message: "Error encountered: BadRequestException: NFT not found"});
        });
    });

    describe('transactionService', () => {
        it('should call throw BadRequestException when user balance is less than nft price', async () => {
            const user = new UserOutput();
            user.id = 'test user from';
            const nftId = 'test nft';
            const nft = new NftEntity();
            nft.id = nftId;
            nft.price = 999;

            const queryRunner = connection.createQueryRunner();
            const manager = queryRunner.manager;
      
            jest.spyOn(queryRunner, 'connect').mockImplementation(null);
            jest.spyOn(queryRunner, 'startTransaction').mockImplementation(null);
            jest.spyOn(queryRunner, 'rollbackTransaction').mockImplementation(null);
            jest.spyOn(queryRunner, 'release').mockImplementation(null);
            jest.spyOn(queryRunner, 'commitTransaction').mockImplementation(null);
            jest.spyOn(manager, 'save').mockImplementation(null);

            jest.spyOn(nftService, 'findNftById').mockImplementation(async () => nft);
      
            const transactionOutput = await transactionService.createTransaction(user, nftId);
            expect(transactionOutput).toStrictEqual({ message: "Error encountered: BadRequestException: Not enough balance"});
        });
    });

    describe('transactionService', () => {
        it('should call throw BadRequestException when nft is currently owned by the user', async () => {
            const user = new UserOutput();
            user.id = 'test user from';
            const userFrom = new UserEntity();
            userFrom.id = user.id;
            const nftId = 'test nft';
            const nft = new NftEntity();
            nft.id = nftId;
            nft.user = userFrom;

            const queryRunner = connection.createQueryRunner();
            const manager = queryRunner.manager;
      
            jest.spyOn(queryRunner, 'connect').mockImplementation(null);
            jest.spyOn(queryRunner, 'startTransaction').mockImplementation(null);
            jest.spyOn(queryRunner, 'rollbackTransaction').mockImplementation(null);
            jest.spyOn(queryRunner, 'release').mockImplementation(null);
            jest.spyOn(queryRunner, 'commitTransaction').mockImplementation(null);
            jest.spyOn(manager, 'save').mockImplementation(null);

            jest.spyOn(nftService, 'findNftById').mockImplementation(async () => nft);
            jest.spyOn(userService, 'viewProfile').mockImplementation(async () => [userFrom]);
      
            const transactionOutput = await transactionService.createTransaction(user, nftId);
            expect(transactionOutput).toStrictEqual({ message: "Error encountered: BadRequestException: NFT is currently owned"});
        });
    });

    describe('transactionService', () => {
        it('should call save in nft repository and return nft entity', async () => {
            const user = new UserOutput();
            user.id = 'test user from';
            const userFrom = new UserEntity();
            userFrom.id = user.id;
            const userTo = new UserEntity();
            userTo.id = 'test user to';
            const nftId = 'test nft';
            const nft = new NftEntity();
            nft.id = nftId;
            nft.user = userTo;
            nft.price = 10;

            const queryRunner = connection.createQueryRunner();
            const manager = queryRunner.manager;
      
            jest.spyOn(queryRunner, 'connect').mockImplementation(null);
            jest.spyOn(queryRunner, 'startTransaction').mockImplementation(null);
            jest.spyOn(queryRunner, 'rollbackTransaction').mockImplementation(null);
            jest.spyOn(queryRunner, 'release').mockImplementation(null);
            jest.spyOn(queryRunner, 'commitTransaction').mockImplementation(async () => {throw new Error()});
            jest.spyOn(manager, 'save').mockImplementation(null);

            jest.spyOn(nftService, 'findNftById').mockImplementation(async () => nft);
            jest.spyOn(userService, 'viewProfile').mockImplementation(async () => [userFrom]);
      
            const transactionOutput = await transactionService.createTransaction(user, nftId);
            expect(connection.createQueryRunner().rollbackTransaction).toHaveBeenCalledTimes(1);
            expect(transactionOutput).toStrictEqual({ message: "Error encountered: Error" });
        });
    });
});