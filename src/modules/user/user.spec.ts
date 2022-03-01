import { BadRequestException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { UserInput } from "./dto/user.input";
import { UserEntity } from "./entity/user.entity";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";

describe('UserService', () => {
    let userService: UserService;
    let userRepository: UserRepository;
  
    beforeAll(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [UserService, UserRepository],
      }).compile();

      userService = await module.resolve(UserService);
      userRepository = await module.resolve(UserRepository);
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    describe('userService', () => {
      it('should be defined', () => {
        expect(userService).toBeDefined();
      });
    });

    describe('findUsers', () => {
        it('should return list of users excluding the current user', async () => {
            const currentUserId = 'current user';
            const user = new UserEntity();
            user.id = 'test user'
        
            jest.spyOn(userRepository, 'findUsers').mockImplementation(async () => [user]);
        
            const userOutput = await userService.findUsers(currentUserId);
            expect(userOutput).toStrictEqual([user]);
        });
    });

    describe('viewProfile', () => {
        it('should return the current user', async () => {
            const user = new UserEntity();
            user.id = 'current user';
        
            jest.spyOn(userRepository, 'viewProfile').mockImplementation(async () => [user]);
        
            const userOutput = await userService.viewProfile(user.id);
            expect(userOutput).toStrictEqual([user]);
        });
    });

    describe('updateProfile', () => {
        it('should return update details of the current user and return the user', async () => {
            const userId = 'test user';
            const user = new UserEntity();
            user.id = userId;
            const input = new UserInput();
            input.aboutMe = 'Nil is pogi';
            const output = new UserEntity();
            output.id = userId
            output.aboutMe = input.aboutMe;
        
            jest.spyOn(userRepository, 'preload').mockImplementation(async () => output);
            jest.spyOn(userRepository, 'save').mockImplementation(async () => output);
        
            const userOutput = await userService.updateProfile(userId, input);
            expect(userOutput).toBe(output);
        });
    });

    describe('deleteUserById', () => {
        it('should delete the user with given id and return message', async () => {
            const userId = 'test user';
            const user = new UserEntity();
            user.id = userId;
        
            jest.spyOn(userRepository, 'viewProfile').mockImplementation(async () => [user]);
            jest.spyOn(userRepository, 'softDelete').mockImplementation(null);
        
            const userOutput = await userService.deleteUserById(userId);
            expect(userOutput).toStrictEqual({ message: "Successfully deleted user " + userId });
        });
    });

    describe('deleteUserById', () => {
        it('should throw BadRequestException when user is not found', async () => {
            const userId = 'test user';
        
            jest.spyOn(userRepository, 'viewProfile').mockImplementation(async () => []);
            jest.spyOn(userRepository, 'softDelete').mockImplementation(null);
        
            await expect(userService.deleteUserById(userId))
                .rejects.toThrowError(BadRequestException);
        });
    });

    describe('restoreUserById', () => {
        it('should restore the user with given id and return message', async () => {
            const userId = 'test user';
            const user = new UserEntity();
            user.id = userId;
        
            jest.spyOn(userRepository, 'viewProfile').mockImplementation(async () => [user]);
            jest.spyOn(userRepository, 'restore').mockImplementation(null);
        
            const userOutput = await userService.restoreUserById(userId);
            expect(userOutput).toStrictEqual({ message: "Successfully restored user " + userId });
        });
    });

    describe('restoreUserById', () => {
        it('should throw BadRequestException when user is not found', async () => {
            const userId = 'test user';
        
            jest.spyOn(userRepository, 'viewProfile').mockImplementation(async () => []);
            jest.spyOn(userRepository, 'restore').mockImplementation(null);
        
            await expect(userService.restoreUserById(userId))
                .rejects.toThrowError(BadRequestException);
        });
    });
});