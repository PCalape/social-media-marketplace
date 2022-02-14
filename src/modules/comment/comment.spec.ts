import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user/user.service';

describe('UserService', () => {
  let service: UserService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  describe('register', () => {
    it('should return $id when provided with user info', () => {
      const userInfo = {
        username: 'user1',
        firstName: 'user',
        lastName: 'wan',
        email: 'user1@gmail.com',
        gender: 'MALE',
      };
    });
  });
});
