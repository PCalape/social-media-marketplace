import { JwtService } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";
import { UserRepository } from "../user/user.repository";
import { AuthService } from "./auth.service";
import { RegisterUserInput } from "./dto/register-user.input";
import * as bcrypt from 'bcrypt';
import { UserEntity } from "../user/entity/user.entity";
import { BadRequestException } from "@nestjs/common";
import { AuthCredentialsInput } from "./dto/auth-credentials.input";

describe('AuthService', () => {
    let authService: AuthService;
    let userRepository: UserRepository;
    let jwtService: JwtService;

    class JwtServiceMock {
        sign(payload): string {
            return 'test secret';
        }
    }
  
    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthService, UserRepository, { provide: JwtService, useClass: JwtServiceMock },],
        }).compile();
    
        authService = await module.resolve(AuthService);
        userRepository = await module.resolve(UserRepository);
        jwtService = await module.resolve(JwtService);
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });

    describe('authService', () => {
        it('should be defined', () => {
          expect(authService).toBeDefined();
        });
      });
    
    describe('register', () => {
        it('should call save in user repository and return user with hashed password', async () => {
            const userInput = new RegisterUserInput();
            const username = 'test username';
            userInput.username = username;
            const password = 'test password';
            userInput.password = password;
            
            const user = new UserEntity();
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);
            user.username = username;
            user.password = hashedPassword;

            jest.spyOn(userRepository, 'findOne').mockImplementation(null);
            jest.spyOn(userRepository, 'save').mockImplementation(async () => user);

            const userOutput = await authService.register(userInput);
            expect(userOutput).toBe(user);
            expect(userRepository.save).toHaveBeenCalledTimes(1);
        });
    });

    describe('register', () => {
        it('should throw BadRequestException if username or email already exist', async () => {
            const userInput = new RegisterUserInput();
            const username = 'test username';
            userInput.username = username;
            const password = 'test password';
            userInput.password = password;
            
            const user = new UserEntity();
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);
            user.username = username;
            user.password = hashedPassword;

            jest.spyOn(userRepository, 'findOne').mockImplementation(async () => user);

            await expect(authService.register(userInput))
                .rejects.toThrowError(BadRequestException);
        });
    });

    describe('login', () => {
        it('should call sign in jwt service and return access token', async () => {
            const input = new AuthCredentialsInput();
            input.username = 'test username';
            input.password = 'test password';
            
            const user = new UserEntity();
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(input.password, salt);
            user.username = input.username;
            user.password = hashedPassword;

            jest.spyOn(userRepository, 'findOne').mockImplementation(async () => user);
            jest.spyOn(jwtService, 'sign').mockImplementation(() => 'accesstoken');

            const userOutput = await authService.login(input);
            expect(userOutput.accessToken).toBe('accesstoken');
            expect(jwtService.sign).toHaveBeenCalledTimes(1);
        });
    });

    describe('login', () => {
        it('should throw BadRequestException when user is not found', async () => {
            const input = new AuthCredentialsInput();
            input.username = 'test username';
            input.password = 'test password';
            
            const user = new UserEntity();
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(input.password, salt);
            user.username = input.username;
            user.password = hashedPassword;

            jest.spyOn(userRepository, 'findOne').mockImplementation(null);

            await expect(authService.login(input))
                .rejects.toThrowError(BadRequestException);
        });
    });

    describe('login', () => {
        it('should throw BadRequestException when user is not found', async () => {
            const input = new AuthCredentialsInput();
            input.username = 'test username';
            input.password = 'test password';
            
            const user = new UserEntity();
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash('another test password', salt);
            user.username = input.username;
            user.password = hashedPassword;

            jest.spyOn(userRepository, 'findOne').mockImplementation(async () => user);

            await expect(authService.login(input))
                .rejects.toThrowError(BadRequestException);
        });
    });
});